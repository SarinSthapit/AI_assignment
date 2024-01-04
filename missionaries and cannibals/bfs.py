from queue import Queue
import pydot
import numpy as np
from time import time  

class Node:
    goal_state = [0, 0, 1]
    num_of_instances = 0

    def __init__(self, state, parent, action, depth):
        self.parent = parent
        self.state = state
        self.action = action
        self.depth = depth
        if self.isKilled():
            color = "#fa0202"
        elif self.goalTest():
            color = "#b3fc08"
        else:
            color = "#6ec9fa"
        self.graph_node = pydot.Node(str(self), style="filled", fillcolor=color, shape="box", penwidth="2", color = "#f5f6f7", label=f'<<b>{str(self)}</b>>')
        Node.num_of_instances += 1


    def __str__(self):
        return str(self.state)

    # To test if state obtained is goal test.
    def goalTest(self):
        if self.state == self.goal_state:
            return True
        return False


    # To test if state obtained is valid.
    def isValid(self):
        missionaries = self.state[0]
        cannibals = self.state[1]
        boat = self.state[2]
        if missionaries < 0 or missionaries > 3:
            return False
        if cannibals < 0 or cannibals > 3:
            return False
        if boat > 1 or boat < 0:
            return False
        return True


    # To check if the state obtained has already been killed.
    def isKilled(self):
        missionaries = self.state[0]
        cannibals = self.state[1]
        if self.state == [3, 3, 0]:
            return False
        if missionaries < cannibals and missionaries > 0:
            return True
        if missionaries > cannibals and missionaries < 3:
            return True


    # To generate the children of a state.
    def generateChild(self):
        children = []
        depth = self.depth + 1
        op = 1  
        boat_move = "from left shore to right"

        if self.state[2] == 1:
            op = -1  
            boat_move = "from right shore to left"

        for x in range(3):
            for y in range(3):
                new_state = self.state.copy()
                new_state[0], new_state[1], new_state[2] = (
                    new_state[0] + (-op) * x,
                    new_state[1] + (-op) * y,
                    new_state[2] + op * 1,
                )
                action = [x, y, op]
                new_node = Node(new_state, self, action, depth)
                if x + y >= 1 and x + y <= 2:
                    children.append(new_node)
        return children


    # To find the solution.
    def findSolution(self):
        solution = []
        solution.append(self.action)
        path = self
        while path.parent != None:
            path = path.parent
            solution.append(path.action)
        solution = solution[:-1]
        solution.reverse()
        return solution

def bfs(initial_state):
    graph = pydot.Dot(
        graph_type = "digraph",
        fontsize = "30",
        color = "white",
        style = "filled",
        fillcolor = "black",
    )
    
    start_node = Node(initial_state, None, None, 0)
    if start_node.goalTest():
        return start_node.findSolution()
    q = Queue()
    q.put(start_node)
    explored = []
    killed = []
    
    while not q.empty():
        node = q.get()
        """print(
            "\nthe node selected to expand is\ndepth="
            + str(node.depth)
            + "\n"
            + str(node.state)
            + "\n"
        )"""
        explored.append(node.state)
        graph.add_node(node.graph_node)
        if node.parent:
            diff = np.subtract(node.parent.state, node.state)
            if node.parent.state[2] == 1:
                diff[0], diff[1] = -diff[0], -diff[1]
            graph.add_edge(
                pydot.Edge(node.parent.graph_node, node.graph_node, label=str(diff))
            )
        children = node.generateChild()
        if not node.isKilled():
            for child in children:
                if child.state not in explored:
                    if child.goalTest():
                        graph.add_node(child.graph_node)
                        diff = np.subtract(node.parent.state, node.state)
                        if node.parent.state[2] == 1:
                            diff[0], diff[1] = -diff[0], -diff[1]
                        graph.add_edge(
                            pydot.Edge(
                                child.parent.graph_node,
                                child.graph_node,
                                label=str(diff),
                            )
                        )
                        leafs = {n.get_name(): True for n in graph.get_nodes()}

                        for e in graph.get_edge_list():
                            leafs[e.get_source()] = False
                        for leaf in leafs:
                            if (
                                leafs[leaf]
                                and str(leaf) not in killed
                                and str(leaf) != '"[0, 0, 1]"'
                            ):
                                node = pydot.Node(
                                    leaf, style="filled", fillcolor="#fc4108"
                                )
                                graph.add_node(node)
                        draw_legend(graph)
                        graph.write_png("output/bfs.png")
                        return child.findSolution()
                
                    if child.isValid():
                        q.put(child)
                        explored.append(child.state)
                else:
                    killed.append('"' + str(node.state) + '"')


# To draw the legend.
def draw_legend(graph):
    graphlegend = pydot.Cluster(
        fontsize = "20",
        fontcolor = "black",
        style = "filled",
        fillcolor = "white",
    )
    graph.add_subgraph(graphlegend)


if __name__ == "__main__":
    initial_state = [3, 3, 0]
    Node.num_of_instances = 0
    t0 = time()
    solution = bfs(initial_state)
    t1 = time() - t0
