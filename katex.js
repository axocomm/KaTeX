/**
 * This is the main entry point for KaTeX. Here, we expose functions for
 * rendering expressions either to DOM nodes or to markup strings.
 *
 * We also expose the ParseError class to check if errors thrown from KaTeX are
 * errors in the expression, or errors in javascript handling.
 */

var ParseError = require("./src/ParseError");

var buildTree = require("./src/buildTree");
var parseTree = require("./src/parseTree");
var utils = require("./src/utils");

/**
 * Parse and build an expression, and place that expression in the DOM node
 * given.
 */
var render = function(toParse, baseNode) {
    utils.clearNode(baseNode);

    var tree = parseTree(toParse);
    var node = buildTree(tree).toNode();

    baseNode.appendChild(node);
};

// KaTeX's styles don't work properly in quirks mode. Print out an error, and
// disable rendering.
if (typeof document !== "undefined") {
    if (document.compatMode !== "CSS1Compat") {
        typeof console !== "undefined" && console.warn(
            "Warning: KaTeX doesn't work in quirks mode. Make sure your " +
                "website has a suitable doctype.");

        render = function() {
            throw new ParseError("KaTeX doesn't work in quirks mode.");
        };
    }
}

/**
 * Parse and build an expression, and return the markup for that.
 */
var renderToString = function(toParse) {
    var tree = parseTree(toParse);
    return buildTree(tree).toMarkup();
};

/**
 * Render all <tex> and .tex elements.
 */
var renderAll = function() {
    var texClassElements = [].slice.call(document.getElementsByClassName("tex"));
    var texTagElements = [].slice.call(document.getElementsByTagName("tex"));
    var texElements = texClassElements.concat(texTagElements);
    texElements.forEach(function (element) {
        var formula = element.textContent;
        if (element.classList !== undefined) {
            if (element.classList.contains("tex-displaystyle") ||
                element.classList.contains("tex-block")) {
                formula = "\\displaystyle{" + formula + "}" ;
            }
        }

        try {
            var rendered = renderToString(formula);
            element.innerHTML = rendered;
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = {
    render: render,
    renderToString: renderToString,
    renderAll: renderAll,
    ParseError: ParseError
};
