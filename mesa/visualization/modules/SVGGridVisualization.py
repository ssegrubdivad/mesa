# SVGGridModule and -Visualization for Mesa
# 
# Modified MIT License:
# Copyright (c) 2023 David Burgess, University of Saskatchewan
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
# and associated documentation files (the 'Software'), to deal in the Software without restriction, 
# including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
# and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
# subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all copies or substantial 
# portions of the Software.
# 
# Any academic work (publication or presentation) or commercial usage resulting from the use of this 
# Software must include a citation analogous to the following:
# 
# AMA:
# Burgess, D. SVGGridModule and -Visualization for Mesa [Computer software]. Version 1.0. Saskatoon, 
# Canada: University of Saskatchewan; 2023.
# 
# APA:
# Burgess, D. (2023). SVGGridModule and -Visualization for Mesa (1.0) [Computer software]. University 
# of Saskatchewan. http://davidburgess.ca/mesa/mesasvg/
# 
# Chicago:
# Burgess, David. SVGGridModule and -Visualization for Mesa. V. 1.0. University of Saskatchewan. Python. 2023.
# 
# Harvard:
# Burgess, D. (2023) SVGGridModule and -Visualization for Mesa (Version 1.0) [Computer program]. University 
# of Saskatchewan, Saskatoon, Canada.
# 
# MLA:
# Burgess, David. SVGGridModule and -Visualization for Mesa. Version 1.0, University of Saskatchewan, 
# 13 May 2023.
# 
# THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
# LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
# WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
# OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# 
# 
# VERSION 1.0
# 
# 
# BASIC USAGE GUIDE
# 
# This file is used in conjunction with the Mesa package for Python for the purpose of providing a visualization
# for Agent-Based Models constructed using Mesa.  The file is used as any other Mesa Visualization Module would be.  
# It replicates, with some additional features, the functionality of CanvasModule.js and GridDraw.js but replaces
# the use of bitmap images within an HTML5 Canvas environment for vector images within an SVG (scalable vector 
# graphics) environment.
# 
# This file, in conjunction with the required SVGGridModule.js file, is a part of a complex data visualization 
# tool, which creates interactive, grid-based visualizations using the D3.js library. It is designed to represent 
# multi-dimensional data on a two-dimensional grid, allowing the user to visualize data where each grid cell can 
# have multiple attributes that are represented by different shapes, colors, sizes, and text. Depending on the 'Shape' 
# attribute of each data point, the script dynamically renders SVG elements including squares, circles, triangles, 
# as well as custom SVG files. These SVG elements are then stylized and positioned according to data attributes 
# like 'Color', 'scale', 'Layer', and 'text' -- be mindful of capitalization idiosyncrasies.
# 
# The visualization contains additional interactivity: 
# 1) When a user hovers over a cell in the grid, a tooltip appears displaying detailed information about that specific 
#    data point, enhancing the user's understanding of the data. The tooltip information includes the cell's position 
#    and layered data attributes. 
# 2) The visualization may be downloaded at any step in the model by simply shift-clicking on the canvas.  The
#    resuling .svg file is a vector graphic that is perfectly scalable can be converted (using free desktop software 
#    like Inkscape for MacOS, Linux, or Windows) to PDF for use in published works. 
# 
# The following are example options for visualizations compatable with the SVGGridModule:
# ```python & mesa
# def agent_portrayal(agent):
#     aValue = 'A' + str(agent.unique_id)     
#     portrayal = {
#         'Filled': 'true',
#     } 
#     if agent.some_variable == True:
#         portrayal['Shape'] = 'circle'
#         portrayal['Layer'] = -1
#         portrayal['text'] = aValue
#         portrayal['text_color'] = 'white'
#         portrayal['Color'] = 'rgb(178, 34, 34)'
#         portrayal['r'] = 0.9
#     elif agent.some_variable == False and agent.some_other_variable == some_value:
#         portrayal['Shape'] = 'square'
#         portrayal['Layer'] = 0
#         portrayal['text'] = agent.unique_id
#         portrayal['text_color'] = '#FFF'
#         portrayal['Color'] = 'blue'
#         portrayal['scale'] = 0.7
#     elif agent.some_variable == False and agent.some_other_variable == some_other_value:
#         portrayal['Shape'] = 'triangle'
#         portrayal['Layer'] = 1
#         portrayal['text'] = agent.unique_id
#         portrayal['text_color'] = 'white'
#         portrayal['Color'] = 'green'
#         portrayal['scale'] = 0.5
#     else:
#         portrayal['Shape'] = 'mysvgfile.svg'
#         portrayal['Layer'] = 2
#         portrayal['text'] = agent.unique_id
#         portrayal['text_color'] = 'yellow'
#         portrayal['Color'] = '#000000'
#         portrayal['scale'] = 0.8
#     return portrayal
# ```
# 
# Note that 'r' and 'scale' are effectively treated as identical and should be interchangable for all shapes 
# and svg files.  'Color' and 'text_color' may be include HTML colour names, hex codes, and RGB codes.
# 
# Although SVG has no z-index equivalent, this visualization module attempts to replicate the behaviour of
# CSS z-index layering.  The range of meaningful z-index (or 'Layer') values is integers of -4 and greater.  
# 'Layer' values work as one might expect CSS z-indices to work.  However, negative values (-4 through -1) will 
# offer an added feature of displaying marginalia for any layer lower than the uppermost layer in that cell.  
# These marginalia are denoted by a minturized version of the shape bearing the 'text' value and attached to 
# the actual shape by a line.  There is no requirement to use negative integer 'Layer' values if the marginalia
# feature is not desirable.
# 
# 
# LOCATIONS
# 
# This file is not currently forked in GitHub and must be manually placed in the following location (or similar 
# depending on your particular installation) for it to function properly with the Mesa 1.2.1 package for Python 
# 3.9.6:
# 
#    path/to/your/venv/lib/python3.9/site-packages/mesa/visualization/modules/SVGGridVisualization.py
# 
# Keep in mind that any .svg files used in the context of portrayal['Shape'] must be placed in the following
# location (or similar) for proper inclusion in your model visualization (you will need to create the 'images'
# directory and may need to modify its permissions):
# 
#    path/to/your/venv/lib/python3.9/site-packages/mesa/visualization/templates/images/
# 
# As noted earlier, the visualization also requires a copy of the cognate SVGGridModule.js to be placed
# in the following location (or similar):
# 
#    path/to/your/venv/lib/python3.9/site-packages/mesa/visualization/templates/js/SVGGridModule.js
# 
# Consequentially, the module must also be imported, defined, and integrated into the ModularServer within your 
# server.py code, as shown in the example below:
# 
# ```python & mesa
# from myAgents import *
# from myModel import *
# from mesa.visualization.modules.SVGGridVisualization import SVGGrid
# from mesa.visualization.ModularVisualization import ModularServer
# # ... other imports go here, as needed.
# 
# # STARTING REQUIRED INPUT #
# # vvvvvvvvvvvvvvvvvvvvvvv #
# 
# agentcount = 20  # <-- The number of agents at model initialization
# gridwidth = 10   # <-- The number of cells wide in the grid
# gridheight = 10  # <-- The number of cells high in the grid
# gridxinpx = 500  # <-- The number of pixels wide for the grid
# gridyinpx = 500  # <-- The number of pixels high for the grid
# 
# # SLIDER INPUT SETUP #
# # vvvvvvvvvvvvvvvvvv #
# 
# numberofagentsslider = UserSettableParameter(
#   'slider', "Number of Agents", agentcount, 1, 100, 1) 
#   # ^-- type, label, defaultval, minval, maxval, increment
# 
# # SERVER DEFINITION #
# # vvvvvvvvvvvvvvvvv #
# 
# svg_grid = SVGGrid(agent_portrayal, gridwidth, gridheight, gridxinpx, gridyinpx)
# server = ModularServer(MyModel, [svg_grid], "My Model", {"N": numberofagentsslider, "width": gridwidth, "height": gridheight})
# 
# server.port = 8521
# server.launch()
# 
# ```


from mesa.visualization.ModularVisualization import VisualizationElement

class SVGGrid(VisualizationElement):
    package_includes = ["SVGGridModule.js"]

    def __init__(self, portrayal_method, grid_width, grid_height, canvas_width=500, canvas_height=500):
        self.portrayal_method = portrayal_method
        self.grid_width = grid_width
        self.grid_height = grid_height
        self.canvas_width = canvas_width
        self.canvas_height = canvas_height
        new_element = "new SVGGridModule({}, {}, {}, {})"
        new_element = new_element.format(self.canvas_width, self.canvas_height, self.grid_width, self.grid_height)
        self.js_code = "window.onload = function() {elements.push(" + new_element + ");};"

    def render(self, model):
        grid_state = []
        for agent in model.schedule.agents:
            portrayal = self.portrayal_method(agent)
            if portrayal:
                portrayal["x"] = agent.pos[0]
                portrayal["y"] = agent.pos[1]
                grid_state.append(portrayal)
        return grid_state
