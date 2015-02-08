# [<img src="https://khan.github.io/KaTeX/katex-logo.svg" width="130" alt="KaTeX">](https://khan.github.io/KaTeX/) [![Build Status](https://travis-ci.org/Khan/KaTeX.svg?branch=master)](https://travis-ci.org/Khan/KaTeX)

KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web.

 * **Fast:** KaTeX renders its math synchronously and doesn't need to reflow the page. See how it compares to a competitor in [this speed test](http://jsperf.com/katex-vs-mathjax/).
 * **Print quality:** KaTeX’s layout is based on Donald Knuth’s TeX, the gold standard for math typesetting.
 * **Self contained:** KaTeX has no dependencies and can easily be bundled with your website resources.
 * **Server side rendering:** KaTeX produces the same output regardless of browser or environment, so you can pre-render expressions using Node.js and send them as plain HTML.

KaTeX supports all major browsers, including Chrome, Safari, Firefox, Opera, and IE 8 - IE 11.

## Usage

You can [download KaTeX](https://github.com/khan/katex/releases) and host it on your server or include the `katex.min.js` and `katex.min.css` files on your page directly from a CDN:

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.js"></script>
```

Call `katex.render` with a TeX expression and a DOM element to render into:

```js
katex.render("c = \\pm\\sqrt{a^2 + b^2}", element);
```

To generate HTML on the server, you can use `katex.renderToString`:

```js
var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
// '<span class="katex">...</span>'
```

Make sure to include the CSS and font files, but there is no need to include the JavaScript.

These APIs default to inline math typesetting; for display math you can prepend `\displaystyle` ([#66](https://github.com/Khan/KaTeX/issues/66)):

```js
katex.render("\\displaystyle {" + formula + "}", element);
// OR
var html = katex.renderToString("\\displaystyle {" + formula + "}");
```

Formulae may also be enclosed within `<span class="tex"></span>` tags and rendered with the `renderAll` function as follows:

```html
<span class="tex">
    \lim_{x\to\infty}\frac{\pi(x)}{x/\ln(x)} = 1
</span>
<!-- ... -->
<script>
    katex.renderAll();
</script>
```

Alternatively, the `<tex></tex>` shorthand may be used:

```html
<tex>
    q^n = \sum_{d|n} dN_d
</tex>
```

This approach also supports `\displaystyle` and block style rendering through the use of the `tex-displaystyle` and `tex-block` classes, respectively.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

KaTeX is licensed under the [MIT License](http://opensource.org/licenses/MIT).
