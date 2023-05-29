// SVGGridModule and -Visualization for Mesa
//
// Modified MIT License:
// Copyright (c) 2023 David Burgess, University of Saskatchewan
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
// and associated documentation files (the 'Software'), to deal in the Software without restriction, 
// including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial 
// portions of the Software.
// 
// Any academic work (publication or presentation) or commercial usage resulting from the use of this 
// Software must include a citation analogous to the following:
// 
// AMA:
// Burgess, D. SVGGridModule and -Visualization for Mesa [Computer software]. Version 1.0. Saskatoon, 
// Canada: University of Saskatchewan; 2023.
// 
// APA:
// Burgess, D. (2023). SVGGridModule and -Visualization for Mesa (1.0) [Computer software]. University 
// of Saskatchewan. http://davidburgess.ca/mesa/mesasvg/
// 
// Chicago:
// Burgess, David. SVGGridModule and -Visualization for Mesa. V. 1.0. University of Saskatchewan. Python. 2023.
// 
// Harvard:
// Burgess, D. (2023) SVGGridModule and -Visualization for Mesa (Version 1.0) [Computer program]. University 
// of Saskatchewan, Saskatoon, Canada.
// 
// MLA:
// Burgess, David. SVGGridModule and -Visualization for Mesa. Version 1.0, University of Saskatchewan, 
// 13 May 2023.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//
// VERSION 1.0
//
//
// BASIC USAGE GUIDE
//
// This file is used in conjunction with the Mesa package for Python for the purpose of providing a visualization
// for Agent-Based Models constructed using Mesa.  The file is used as any other Mesa Visualization Module would be.  
// It replicates, with some additional features, the functionality of CanvasModule.js and GridDraw.js but replaces
// the use of bitmap images within an HTML5 Canvas environment for vector images within an SVG (scalable vector 
// graphics) environment.
//
// This file, in conjunction with the required SVGGridVisualization.py file, is a part of a complex data visualization 
// tool, which creates interactive, grid-based visualizations using the D3.js library. It is designed to represent 
// multi-dimensional data on a two-dimensional grid, allowing the user to visualize data where each grid cell can 
// have multiple attributes that are represented by different shapes, colors, sizes, and text. Depending on the 'Shape' 
// attribute of each data point, the script dynamically renders SVG elements including squares, circles, triangles, 
// as well as custom SVG files. These SVG elements are then stylized and positioned according to data attributes 
// like 'Color', 'scale', 'Layer', and 'text' -- be mindful of capitalization idiosyncrasies.
//
// The visualization contains additional interactivity: 
// 1) When a user hovers over a cell in the grid, a tooltip appears displaying detailed information about that specific 
//    data point, enhancing the user's understanding of the data. The tooltip information includes the cell's position 
//    and layered data attributes. 
// 2) The visualization may be downloaded at any step in the model by simply shift-clicking on the canvas.  The
//    resuling .svg file is a vector graphic that is perfectly scalable can be converted (using free desktop software 
//    like Inkscape for MacOS, Linux, or Windows) to PDF for use in published works. 
//
// The following are example options for visualizations compatable with the SVGGridModule:
// ```python & mesa
// def agent_portrayal(agent):
//     aValue = 'A' + str(agent.unique_id)     
//     portrayal = {
//         'Filled': 'true',
//     } 
//     if agent.some_variable == True:
//         portrayal['Shape'] = 'circle'
//         portrayal['Layer'] = -1
//         portrayal['text'] = aValue
//         portrayal['text_color'] = 'white'
//         portrayal['Color'] = 'rgb(178, 34, 34)'
//         portrayal['r'] = 0.9
//     elif agent.some_variable == False and agent.some_other_variable == some_value:
//         portrayal['Shape'] = 'square'
//         portrayal['Layer'] = 0
//         portrayal['text'] = agent.unique_id
//         portrayal['text_color'] = '#FFF'
//         portrayal['Color'] = 'blue'
//         portrayal['scale'] = 0.7
//     elif agent.some_variable == False and agent.some_other_variable == some_other_value:
//         portrayal['Shape'] = 'triangle'
//         portrayal['Layer'] = 1
//         portrayal['text'] = agent.unique_id
//         portrayal['text_color'] = 'white'
//         portrayal['Color'] = 'green'
//         portrayal['scale'] = 0.5
//     else:
//         portrayal['Shape'] = 'mysvgfile.svg'
//         portrayal['Layer'] = 2
//         portrayal['text'] = agent.unique_id
//         portrayal['text_color'] = 'yellow'
//         portrayal['Color'] = '#000000'
//         portrayal['scale'] = 0.8
//     return portrayal
// ```
//
// Note that 'r' and 'scale' are effectively treated as identical and should be interchangable for all shapes 
// and svg files.  'Color' and 'text_color' may be include HTML colour names, hex codes, and RGB codes.
//
// Although SVG has no z-index equivalent, this visualization module attempts to replicate the behaviour of
// CSS z-index layering.  The range of meaningful z-index (or 'Layer') values is integers of -4 and greater.  
// 'Layer' values work as one might expect CSS z-indices to work.  However, negative values (-4 through -1) will 
// offer an added feature of displaying marginalia for any layer lower than the uppermost layer in that cell.  
// These marginalia are denoted by a minturized version of the shape bearing the 'text' value and attached to 
// the actual shape by a line.  There is no requirement to use negative integer 'Layer' values if the marginalia
// feature is not desirable.
//
//
// LOCATIONS
//
// This file is not currently forked in GitHub and must be manually placed in the following location (or similar 
// depending on your particular installation) for it to function properly with the Mesa 1.2.1 package for Python 
// 3.9.6:
//
//    path/to/your/venv/lib/python3.9/site-packages/mesa/visualization/templates/js/SVGGridModule.js
//
// Keep in mind that any .svg files used in the context of portrayal['Shape'] must be placed in the following
// location (or similar) for proper inclusion in your model visualization (you will need to create the 'images'
// directory and may need to modify its permissions):
//
//    path/to/your/venv/lib/python3.9/site-packages/mesa/visualization/templates/images/
//
// As noted earlier, the visualization also requires a copy of the cognate SVGGridVisualization.py to be placed
// in the following location (or similar):
//
//    path/to/your/venv/lib/python3.9/site-packages/mesa/visualization/modules/SVGGridVisualization.py
//
// Consequentially, the module must also be imported, defined, and integrated into the ModularServer within your 
// server.py code, as shown in the example below:
//
// ```python & mesa
// from myAgents import *
// from myModel import *
// from mesa.visualization.modules.SVGGridVisualization import SVGGrid
// from mesa.visualization.ModularVisualization import ModularServer
// # ... other imports go here, as needed.
//
// # STARTING REQUIRED INPUT #
// # vvvvvvvvvvvvvvvvvvvvvvv #
//
// agentcount = 20  # <-- The number of agents at model initialization
// gridwidth = 10   # <-- The number of cells wide in the grid
// gridheight = 10  # <-- The number of cells high in the grid
// gridxinpx = 500  # <-- The number of pixels wide for the grid
// gridyinpx = 500  # <-- The number of pixels high for the grid
//
// # SLIDER INPUT SETUP #
// # vvvvvvvvvvvvvvvvvv #
//
// numberofagentsslider = UserSettableParameter(
//   'slider', "Number of Agents", agentcount, 1, 100, 1) 
//   # ^-- type, label, defaultval, minval, maxval, increment
//
// # SERVER DEFINITION #
// # vvvvvvvvvvvvvvvvv #
//
// svg_grid = SVGGrid(agent_portrayal, gridwidth, gridheight, gridxinpx, gridyinpx)
// server = ModularServer(MyModel, [svg_grid], "My Model", {"N": numberofagentsslider, "width": gridwidth, "height": gridheight})
//
// server.port = 8521
// server.launch()
//
// ```


// Create a new div element for the tooltip
var tooltipDiv = document.createElement('div');

// Assign it an id
tooltipDiv.id = 'tooltip';

// Add initial styles
tooltipDiv.style.opacity = 0;
tooltipDiv.style.position = 'absolute';

// Create a new p element for the tooltip text
var tooltipText = document.createElement('p');

// Assign it an id
tooltipText.id = 'tooltipText';

// Append the p element to the tooltip div
tooltipDiv.appendChild(tooltipText);

// Append the tooltip div to the body of the document
document.body.appendChild(tooltipDiv);

var script = document.createElement('script');
script.src = 'https://d3js.org/d3.v5.min.js';
script.onload = function() {
    // D3.js is loaded, you can use it here
    window.SVGGridModule = function (canvas_width, canvas_height, grid_width, grid_height) {

        // Create SVG element
        var svg = d3.select('#elements')
            .append('svg')
            .attr('width', canvas_width)
            .attr('height', canvas_height);

        var gridlinesGroup = svg.append('g').attr('id', 'gridlinesGroup');
        var shapesGroup = svg.append('g').attr('id', 'shapesGroup');
        var textGroup = svg.append('g').attr('id', 'textGroup');

        var cell_width = canvas_width / grid_width;
        var cell_height = canvas_height / grid_height;

        // Draw gridlines
        // Vertical
        for (var i = 0; i <= grid_width; i++) {
            gridlinesGroup.append('line')
                .attr('x1', i * cell_width)
                .attr('y1', 0)
                .attr('x2', i * cell_width)
                .attr('y2', canvas_height)
                .style('stroke', 'black')
                .style('stroke-width', 0.25)
                .style('stroke-dasharray', '0.25,0.25');
        }

        // Horizontal
        for (var j = 0; j <= grid_height; j++) {
            gridlinesGroup.append('line')
                .attr('x1', 0)
                .attr('y1', j * cell_height)
                .attr('x2', canvas_width)
                .attr('y2', j * cell_height)
                .style('stroke', 'black')
                .style('stroke-width', 0.25)
                .style('stroke-dasharray', '0.25,0.25');
        }

        this.reset = function () {
            svg.selectAll('.cell').remove();
        };

        this.render = function (data) {

            async function appendSvgToCellMain(cell, imageHref, dx, dy, dr, cell_width, cell_height) {
                const response = await fetch(imageHref);
                const data = await response.text();
                const parser = new DOMParser();
                const svgElement = parser.parseFromString(data, 'image/svg+xml').documentElement;

                svgElement.setAttribute('x', dx * cell_width + (cell_width / 2) - (dr * cell_width / 2));
                svgElement.setAttribute('y', dy * cell_height + (cell_height / 2) - (dr * cell_height / 2));
                svgElement.setAttribute('width', cell_width * dr);
                svgElement.setAttribute('height', cell_height * dr);

                cell.node().appendChild(svgElement);
                cell.style('cursor', 'help');
            }

            async function callAppendSvgToCellMain(cell, imageHref, dx, dy, dr, cell_width, cell_height) {
                await appendSvgToCellMain(cell, imageHref, dx, dy, dr, cell_width, cell_height);
            }

            async function appendSvgToCellCorner(cell, imageHref, xPos, yPos, size, sizeSVG) {
                const response = await fetch(imageHref);
                const data = await response.text();
                const parser = new DOMParser();
                const svgElement = parser.parseFromString(data, 'image/svg+xml').documentElement;

                svgElement.setAttribute('x', xPos - size);
                svgElement.setAttribute('y', yPos - size);
                svgElement.setAttribute('width', sizeSVG * 2);
                svgElement.setAttribute('height', sizeSVG * 2);

                cell.node().appendChild(svgElement);
                cell.style('cursor', 'help');
            }

            async function callAppendSvgToCellCorner(cell, dShape, xPos, yPos, size, sizeSVG) {
                await appendSvgToCellCorner(cell, dShape, xPos, yPos, size, sizeSVG);
            }
            
            // Flip the y values in the data
            data.forEach(function(d) {
                // Subtract each y value from the maximum y value
                d.y = grid_height - d.y - 1;  
            });

            // Initialize an empty dictionary for cell positions
            var cellDict = {};

            // Sort the agents based on their layer value so that SVG displays correctly
            // NB: SVG does not have a z-index analog, rather it uses the order in which the elements are added
            data.sort(function(a, b) {
                return a.Layer - b.Layer;
            });

            // Create a Map to hold the first element per layer for each cell
            let firstPerLayerPerCell = new Map();

            data.forEach((element) => {
                let key = element.x + ',' + element.y + ',' + element.Layer;
                if (!firstPerLayerPerCell.has(key)) {
                    firstPerLayerPerCell.set(key, element);
                }
            });

            // Convert the Map values to an array for use in D3
            let filteredData = Array.from(firstPerLayerPerCell.values());

            // Update the SVG element based on the data received from the server
            var cells = shapesGroup.selectAll('.cell')
                .data(filteredData, function(d) {
                    return d.x + ',' + d.y + ',' + d.text + ',' + d.Layer;
                });

            // For each data element, create or update the corresponding SVG element
            var newCells = cells.enter()
                .append('g') // Use a 'g' element to group the circle and text
                .attr('class', 'cell');

            // Draw the elements based on the portrayal['Shape'] attribute
            newCells.each(function(d) {
                var cell = d3.select(this);
                // allow for use of either portrayal['r'] or ...['scale']
                if (typeof d.scale !== 'undefined') {
                    d.r = d.scale;
                }

                // Check the value of the portrayal['Shape'] attribute
                if (d.Shape.endsWith('.svg')) {

                    // BEGIN ADD MAIN SVG FILE
                    callAppendSvgToCellMain(cell, 'static/images/' + d.Shape, d.x, d.y, d.r, cell_width, cell_height);
                    // END ADD MAIN SVG FILE

                } else if (d.Shape === 'square') {

                    // BEGIN ADD MAIN SQUARE
                    cell.append('rect')
                        .attr('x', function(d) {
                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            return d.x * cell_width + cell_width / 2 - d.r * Math.min(cell_width, cell_height) / 2;
                        })
                        .attr('y', function(d) {
                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            return d.y * cell_height + cell_height / 2 - d.r * Math.min(cell_width, cell_height) / 2;
                        })
                        .attr('width', function(d) {
                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            return d.r * Math.min(cell_width, cell_height);
                        })
                        .attr('height', function(d) {
                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            return d.r * Math.min(cell_width, cell_height);
                        })
                        .style('fill', function(d) {
                            return d.Color;
                        })
                        .style('cursor', 'help');
                    // END ADD MAIN SQUARE

                } else if (d.Shape === 'circle') {

                    // BEGIN ADD MAIN CIRCLE
                    cell.append('circle')
                        .attr('cx', function(d) {
                            // Add an offset of half the cell width
                            return d.x * cell_width + cell_width / 2;  
                        })
                        .attr('cy', function(d) {
                            // Add an offset of half the cell height
                            return d.y * cell_height + cell_height / 2;  
                        })
                        .attr('r', function(d) {
                            // Use portrayal['r'] attribute for radius
                            return d.r * Math.min(cell_width, cell_height) / 2; 
                        })
                        .style('fill', function(d) {
                            // Use portrayal['Color'] attribute for fill color
                            return d.Color; 
                        })
                        .style('cursor', 'help');
                    // END ADD MAIN CIRCLE

                } else if (d.Shape === 'triangle') {

                    // BEGIN ADD MAIN TRIANGLE
                    cell.append('polygon')
                        .attr('points', function(d) {
                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            var halfSize = d.r * Math.min(cell_width, cell_height) / 2;
                            var xPos = d.x * cell_width + cell_width / 2;
                            var yPos = d.y * cell_height + cell_height / 2;
                            var point1 = (xPos - halfSize) + ',' + (yPos + halfSize);
                            var point2 = (xPos + halfSize) + ',' + (yPos + halfSize);
                            var point3 = xPos + ',' + (yPos - halfSize);
                            return point1 + ' ' + point2 + ' ' + point3;
                        })
                        .style('fill', function(d) {
                            // Use portrayal['Color'] attribute for fill color
                            return d.Color; 
                        })
                        .style('cursor', 'help');
                    // END ADD MAIN TRIANGLE

                }
            });

            // BEGIN ADD CORNER INFORMATION
            // Draw the elements based on the portrayal['Shape'] attribute
            newCells.each(function(d) {
                var cell = d3.select(this);

                // allow for use of either portrayal['r'] or ...['scale']
                if (typeof d.scale !== 'undefined') {
                    d.r = d.scale;
                }

                var key = d.x.toString() + ',' + d.y.toString();
                var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));

                var xPos, yPos, size, sizeSVG;

                size = Math.min(cell_width, cell_height) * 0.15;
                sizeSVG = Math.min(cell_width, cell_height) * 0.15;

                if (maxLayer > d.Layer && d.Layer < 0) {
                    // Compute the X and Y positions based on layer value
                    switch (d.Layer) {

                        case -1: 
                            xPos = (d.x * cell_width + cell_width) - ((1 - d.r) * cell_width/4);
                            yPos = (d.y * cell_height) + ((1 - d.r) * cell_width/4);
                            break;
                        case -2: 
                            xPos = (d.x * cell_width + cell_width) - ((1 - d.r) * cell_width/4); 
                            yPos = (d.y * cell_height + cell_height) - ((1 - d.r) * cell_width/4);
                            break;
                        case -3: 
                            xPos = (d.x * cell_width) + ((1 - d.r) * cell_width/4);
                            yPos = (d.y * cell_height + cell_height) - ((1 - d.r) * cell_width/4);
                            break;
                        case -4: 
                            xPos = (d.x * cell_width) + ((1 - d.r) * cell_width/4);  
                            yPos = (d.y * cell_height) + ((1 - d.r) * cell_width/4);
                            break;

                    }
                } else {
                    xPos = (d.x * cell_width + cell_width / 2);
                    yPos = (d.y * cell_height + cell_height / 2);
                    sizeSVG = 0;
                }

                

                if (d.Shape.endsWith('.svg') && d.Layer < 0) {

                    // BEGIN ADD CORNER INFORMATION SVG FILE
                    callAppendSvgToCellCorner(cell, 'static/images/' + d.Shape, xPos, yPos, size, sizeSVG);
                    // END ADD CORNER INFORMATION SVG FILE

                } else if (d.Shape === 'square' && d.Layer < 0) {

                    // BEGIN ADD CORNER INFORMATION SQUARE
                    cell.append('rect')
                        .attr('x', xPos - size)
                        .attr('y', yPos - size)
                        .attr('width', size * 2)
                        .attr('height', size * 2)
                        .style('fill', d.Color)
                        .style('cursor', 'help');
                    // END ADD CORNER INFORMATION SQUARE

                } else if (d.Shape === 'circle' && d.Layer < 0) {

                    // BEGIN ADD CORNER INFORMATION CIRCLE
                    cell.append('circle')
                        .attr('cx', xPos)
                        .attr('cy', yPos)
                        .attr('r', size)
                        .style('fill', d.Color)
                        .style('cursor', 'help');
                    // END ADD CORNER INFORMATION CIRCLE

                } else if (d.Shape === 'triangle' && d.Layer < 0) {

                    // BEGIN ADD CORNER INFORMATION TRIANGLE
                    cell.append('polygon')
                        .attr('points', function(d) {
                            var point1 = (xPos - size) + ',' + (yPos + size);
                            var point2 = (xPos + size) + ',' + (yPos + size);
                            var point3 = xPos + ',' + (yPos - size);
                            return point1 + ' ' + point2 + ' ' + point3;
                        })
                        .style('fill', d.Color)
                        .style('cursor', 'help');
                    // END ADD CORNER INFORMATION TRIANGLE

                }
            });

            // Add joining line to each cell for use as needed
            newCells.append('line') 
                .attr('x1', function(d) {

                    // Start line in the middle of the cell
                    return (d.x * cell_width + cell_width / 2);  
                })
                .attr('y1', function(d) {

                    // Start line in the middle of the cell
                    return (d.y * cell_height + cell_height / 2);  
                })
                .attr('x2', function(d) {
                    // allow for use of either portrayal['r'] or ...['scale']
                    if (typeof d.scale !== 'undefined') {
                        d.r = d.scale;
                    }
                    
                    var key = d.x.toString() + ',' + d.y.toString();
                    var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));
                    if (maxLayer > d.Layer && d.Layer < 0) {

                        // Compute the X position based on portrayal['Layer'] value
                        switch (d.Layer) {

                            // Position line end at the right edge of the cell
                            case -1: return (d.x * cell_width + cell_width) - ((1 - d.r) * cell_width/4);
                            case -2: return (d.x * cell_width + cell_width) - ((1 - d.r) * cell_width/4);  
                            // Position line end at the left edge of the cell
                            case -3: return (d.x * cell_width) + ((1 - d.r) * cell_width/4);
                            case -4: return (d.x * cell_width) + ((1 - d.r) * cell_width/4);  

                        }
                    } else {

                        // Position line end in the middle of the cell; 
                        // in other words, no line.
                        return (d.x * cell_width + cell_width / 2);  
                    }

                })
                .attr('y2', function(d) {
                    // allow for use of either portrayal['r'] or ...['scale']
                    if (typeof d.scale !== 'undefined') {
                        d.r = d.scale;
                    }
                    
                    var key = d.x.toString() + ',' + d.y.toString();
                    var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));
                    if (maxLayer > d.Layer && d.Layer < 0) {

                        // Compute the Y position based on layer value
                        switch (d.Layer) {

                            // Position line end at the top edge of the cell
                            case -1: return (d.y * cell_height) + ((1 - d.r) * cell_width/4);
                            // Position line end at the bottom edge of the cell
                            case -2: return (d.y * cell_height + cell_height) - ((1 - d.r) * cell_width/4);
                            case -3: return (d.y * cell_height + cell_height) - ((1 - d.r) * cell_width/4);  
                            // Position line end at the top edge of the cell
                            case -4: return (d.y * cell_height) + ((1 - d.r) * cell_width/4); 

                        }
                    } else {

                        // Position line end in the middle of the cell;
                        // in other words, no line.
                        return (d.y * cell_height + cell_height / 2);  
                    }
                })
                .style('stroke', function(d) {

                    // Use portrayal['text_color'] attribute for line color
                    return d.Color; 
                })

                // Set line width
                .style('stroke-width', 0.5) 
                
                // Set line dotted
                .style('stroke-dasharray', '0.25,0.25');


            var textCells = textGroup.selectAll('.cell')
                .data(filteredData, function(d) {
                    return d.x + ',' + d.y + ',' + d.text + ',' + d.Layer;
                });

            var newTextCells = textCells.enter()
                .append('g')
                .attr('class', 'cell');

                newTextCells.each(function(d) {
                    var cell = d3.select(this);

                    // allow for use of either portrayal['r'] or ...['scale']
                    if (typeof d.scale !== 'undefined') {
                        d.r = d.scale;
                    }

                    var key = d.x.toString() + ',' + d.y.toString();
                    var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));


                    // Add text to each cell
                    var textElement = cell.append('text') 
                        .text(function(d) {

                            // Use portrayal['text'] attribute for text content
                            if (maxLayer > d.Layer && d.Layer > 0) {
                                return '';
                            } else {
                                return d.text; 
                            }
                        })
                        .attr('x', function(d) {
                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            var key = d.x.toString() + ',' + d.y.toString();
                            var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));
                            if (maxLayer > d.Layer && d.Layer < 0) {

                                // Compute the X position based on layer value
                                switch (d.Layer) {

                                    // Position text at the right edge of the cell
                                    case -1: return (d.x * cell_width + cell_width) - ((1 - d.r) * cell_width/4);
                                    case -2: return (d.x * cell_width + cell_width) - ((1 - d.r) * cell_width/4);  
                                    // Position text at the left edge of the cell
                                    case -3: return (d.x * cell_width) + ((1 - d.r) * cell_width/4);
                                    case -4: return (d.x * cell_width) + ((1 - d.r) * cell_width/4); 

                                }
                            } else {

                                // Position text in the middle of the cell
                                return d.x * cell_width + cell_width / 2;  
                            }
                        })
                        .attr('y', function(d) {

                            // allow for use of either portrayal['r'] or ...['scale']
                            if (typeof d.scale !== 'undefined') {
                                d.r = d.scale;
                            }
                            var key = d.x.toString() + ',' + d.y.toString();
                            var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));
                            
                            // Initialize offset to 0
                            var yOffset = 3.5; 
                            var yInfoOffset = 2.5;

                            if (d.r < 0.5) {
                                // Set font size to be 15% of the cell height
                                yOffset = 1.5;
                            }
                            
                            // Check if the shape is triangle, if yes then update the offset
                            // because text doesn't fit nicely in the pointy bit of a triangle
                            if (d.Shape === 'triangle') {
                                yOffset = cell_width * d.r * 0.2;
                                yInfoOffset = 0.05 * cell_width;
                            }

                            if (maxLayer > d.Layer && d.Layer < 0) {

                                // Compute the Y position based on layer value
                                switch (d.Layer) {

                                    // Position text at the top edge of the cell
                                    case -1: return (d.y * cell_height) + 0.5 + ((1 - d.r) * cell_width/4) + yInfoOffset;
                                    // Position text at the bottom edge of the cell    
                                    case -2: return (d.y * cell_height + cell_height) + 0.5 - ((1 - d.r) * cell_width/4) + yInfoOffset;
                                    case -3: return (d.y * cell_height + cell_height) + 0.5 - ((1 - d.r) * cell_width/4) + yInfoOffset;
                                    // Position text at the top edge of the cell
                                    case -4: return (d.y * cell_height) + 0.5 + ((1 - d.r) * cell_width/4) + yInfoOffset;

                                }
                            } else {
                                return (d.y * cell_height + cell_height / 2) + 1 + yOffset;
                            }
                        })

                        // Vertically center text
                        // .attr('dominant-baseline', 'middle')
                        // REMOVED BECAUSE NOT UNIVERSALLY SUPPORTED
                        // OPTED TO USE d.y INSTEAD AS GIVES MORE UNIVERSAL CONTROL

                        // Horizontally center text
                        .attr('text-anchor', 'middle') 
                        .attr('fill', function(d) {

                            // Use portrayal['text_color'] attribute for text color
                            return d.text_color; 
                        })

                        // Set the font to Arial
                        .style('font-family', 'Arial') 
                        .style('cursor', 'help')
                        .style('font-size', function(d) {
                            var key = d.x.toString() + ',' + d.y.toString();
                            var maxLayer = Math.max.apply(null, data.filter(item => item.x.toString() + ',' + item.y.toString() === key).map(item => item.Layer));
                            if (maxLayer > d.Layer && d.Layer < 0) {

                                // Set font size to be 15% of the cell height
                                return 0.15 * cell_height + 'px';  
                            } else if (maxLayer > d.Layer) {
                                return 0 + 'px';
                            } else {
                                if (d.r < 0.5) {
                                    // Set font size to be 15% of the cell height
                                    return 0.15 * cell_height + 'px';
                                }
                                else {
                                    // Set font size to be 30% of the cell height
                                    return 0.3 * cell_height + 'px'; 
                                }
                            }
                        });
                    });

            // END ADD CORNER INFORMATION

            // BEGIN TOOLTIP
            // Create a map of all cells
            var tooltipcells = {};

            data.forEach(function(d) {

                // Subtract each y value from the maximum y value
                d.y = grid_height - d.y - 1;  

            });

            data.forEach(function(d) {
                var key = d.x + ',' + d.y;
                if (!tooltipcells[key]) {
                    tooltipcells[key] = [];
                }
                tooltipcells[key].push(d);
            });

            // Show tooltip when mouseover cell contents
            svg.selectAll('.cell').on('mouseover', function(d) {
              
                // Compute the text to display in the tooltip
                var text = 'Cell (' + d.x + ',' + d.y + '): ';
                var key = d.x + ',' + d.y;
                var ttcount = 0;

                tooltipcells[key].forEach(function(d) {
                    if (text == 'Cell (' + d.x + ',' + d.y + '): ') {
                        text += d.text + '[' + d.Layer + ']';
                        ttcount += 2;
                    } else {
                        if (ttcount == 4) {
                            var separator = ',<br />';
                            ttcount = 0;
                        } else {
                        var separator = ', ';
                        }
                        text += separator + d.text + '[' + d.Layer + ']';
                        ttcount += 1;
                    }
                });

                // Show the tooltip div and fill it with text
                var tooltip = d3.select('#tooltip');
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .75)
                    .style('background', 'white')
                    .style('padding-right', '0.5em')
                    .style('padding-left', '0.5em')
                    .style('padding-top', '0.5em')
                    .style('padding-bottom', '0.75em')
                    .style('border', '0.1px black dotted');

                tooltip.html(text)
                    .style('left', (d3.event.pageX + 10) + 'px')
                    .style('top', (d3.event.pageY - 25) + 'px')
                    .style('width', 'fit-content')
                    .style('cursor', 'help');
            })

            // Hide tooltip when mouseout cell contents
            .on('mouseout', function(d) {

                // Hide the tooltip div
                d3.select('#tooltip').transition()
                    .duration(500)
                    .style('opacity', 0);
            });
            // END TOOLTIP
            
            // Remove SVG elements that are not in the data received from the server
            cells.exit().remove();
            textCells.exit().remove();

            // Function to download SVG
            document.querySelector('svg').addEventListener('click', function(event) {
                if (event.shiftKey) {
                    const svg = this.cloneNode(true); 
                    document.body.appendChild(svg); 
                    const g = svg.querySelector('g');
                    g.setAttribute('transform', '');
                    svg.setAttribute('width', g.getBBox().width);
                    svg.setAttribute('height', g.getBBox().height);
                    const svgAsXML = (new XMLSerializer).serializeToString(svg);
                    const svgData = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
                    const link = document.createElement('a');
                    document.body.appendChild(link); 
                    link.setAttribute('href', svgData);
                    link.setAttribute('download', 'image.svg');
                    link.click();

                    // Clean up by removing the appended elements
                    document.body.removeChild(svg);
                    document.body.removeChild(link);
                }
            });
        };
    }
};

// Add the script to the body of the HTML file
document.body.appendChild(script);
