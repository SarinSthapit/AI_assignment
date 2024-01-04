
import pydot
from time import time
from datetime import datetime


class Puzzle:
    goal_state = [1, 2, 3, 8, 0, 4, 7, 6, 5]
    num_of_instances = 0

    def __init__(self, state, parent, action, depth):
        self.parent = parent
        self.state = state
        self.action = action
        self.depth = depth
        if self.goal_test():
            color = "#b3fc08"
        elif self.depth >= 5:
            color = "#fa0202"
        else:
            color = "#6ec9fa"
        self.graph_node = pydot.Node(
            str(self), style="filled", fillcolor=color, shape="square")

        now = datetime.now()
        timestamp = datetime.timestamp(now)
        self.tie_breaker = (timestamp, Puzzle.num_of_instances)
        Puzzle.num_of_instances += 1


    # To display the space state tree.
    def display(self):
        list = self.state
        string = ""
        for i in range(9):
            if (i + 1) % 3 != 0:
                if list[i] == 0:
                    string += ("|   ")
                else:
                    string += ("| %d " % list[i])
            else:
                if list[i] == 0:
                    string += ("|   \n")
                else:
                    string += ("| %d |\n" % list[i])
        string += "\n"
        return string


    def __str__(self):
        return self.display()


    # To check if the obtained state is goal state or not.
    def goal_test(self):
        if self.state == self.goal_state:
            return True
        return False


    # To find all the legal actions.
    @staticmethod
    def find_legal_actions(i, j):
        legal_action = ['UP', 'DOWN', 'LEFT', 'RIGHT']
        if i == 0:  
            legal_action.remove('UP')
        if i == 2:  
            legal_action.remove('DOWN')
        if j == 0:
            legal_action.remove('LEFT')
        if j == 2:
            legal_action.remove('RIGHT')

        print(f"i: {i}, j: {j}, legal_actions: {legal_action}")
        return legal_action


    # To generate child of a node. 
    def generate_child(self):
        children = []
        x = self.state.index(0)
        i, j = divmod(x, 3)
        depth = self.depth + 1

        possible_moves = [
            ('UP', (i - 1, j)),
            ('DOWN', (i + 1, j)),
            ('LEFT', (i, j - 1)),
            ('RIGHT', (i, j + 1))
        ]

        for action, (new_i, new_j) in possible_moves:
            if 0 <= new_i < 3 and 0 <= new_j < 3:
                new_state = self.state.copy()
                new_x = new_i * 3 + new_j
                new_state[x], new_state[new_x] = new_state[new_x], new_state[x]
                children.append(Puzzle(new_state, self, action, depth))

        return children


    # To find the solution.
    def find_solution(self):
        solution = []
        solution.append(self.action)
        path = self
        while path.parent is not None:
            path = path.parent
            solution.append(path.action)
        solution = solution[:-1]
        solution.reverse()
        return solution


    def misplaced_tiles(self):
        count = 0
        for i in range(9):
            if self.state[i] != self.goal_state[i]:
                count += 1
        return count


    # Less than comparison.
    def __lt__(self, other):
        return (self.depth + self.misplaced_tiles(), self.num_of_instances) < (other.depth + other.misplaced_tiles(), other.num_of_instances)


    # Less than or equal to comparison.
    def __le__(self, other):
        return (self.depth + self.misplaced_tiles()) <= (other.depth + other.misplaced_tiles())


    # Equal to comparison.
    def __eq__(self, other):
        return self.state == other.state and self.tie_breaker == other.tie_breaker


def a_star_search(initial_state):
    graph = pydot.Dot(
        graph_type='digraph', label="\n", fontsize="22", color="red",
        fontcolor="black", style="filled", fillcolor="black")
    
    start_node = Puzzle(initial_state, None, None, 0)
    if start_node.goal_test():
        return start_node.find_solution()

    open_list = [start_node]
    closed_set = set()
    graph.add_node(start_node.graph_node)
    legal_moves_by_level = {}

    while open_list:
        open_list.sort()
        current_node = open_list.pop(0)

        if current_node.goal_test():
            solution = current_node.find_solution()
            break

        closed_set.add(tuple(current_node.state))

        children = current_node.generate_child()
        legal_moves_by_level[current_node.depth] = [child.action for child in children]

        for child in children:
            if tuple(child.state) not in closed_set and child not in open_list:
                open_list.append(child)
                graph.add_node(child.graph_node)
                graph.add_edge(pydot.Edge(
                    current_node.graph_node, child.graph_node, label=str(child.action)))

    for level, moves in legal_moves_by_level.items():
        print(f"Level {level}: Possible Legal Moves - {moves}")

    graph.write_png('a-star-misplaced-tile.png')
    return solution


# To draw the legend.
def draw_legend(graph):
    graphlegend = pydot.Cluster(
        graph_name="legend", label="Legend", fontsize="20", color="red",
        fontcolor="blue", style="filled", fillcolor="white")

    legend1 = pydot.Node('Processed node', shape="plaintext")
    graphlegend.add_node(legend1)
    legend2 = pydot.Node("Depth limit reached", shape="plaintext")
    graphlegend.add_node(legend2)
    legend3 = pydot.Node('Goal Node', shape="plaintext")
    graphlegend.add_node(legend3)

    node1 = pydot.Node("1", style="filled", fillcolor="green", label="")
    graphlegend.add_node(node1)
    node2 = pydot.Node("2", style="filled", fillcolor="cyan", label="")
    graphlegend.add_node(node2)
    node3 = pydot.Node("3", style="filled", fillcolor="gold", label="")
    graphlegend.add_node(node3)

    graph.add_subgraph(graphlegend)
    graph.add_edge(pydot.Edge(legend1, legend2, style="invis"))
    graph.add_edge(pydot.Edge(legend2, legend3, style="invis"))

    graph.add_edge(pydot.Edge(node1, node2, style="invis"))
    graph.add_edge(pydot.Edge(node2, node3, style="invis"))


initial_state = [2, 8, 3, 1, 6, 4, 7, 0, 5]
Puzzle.num_of_instances = 0
t0 = time()
solution = a_star_search(initial_state)
t1 = time() - t0
print('Solution:', solution)
print()
