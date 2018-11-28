# Loconomics Site

These notes are very informal and should be replaced with something better once we're up and running.

## The Basics

This site uses [Hugo](https://gohugo.io). Hugo has some pretty extensive [docs](https://gohugo.io/documentation/), but I'll link to the basics here. To get up and running quickly:

1. [Install the EXTENDED version of Hugo](https://gohugo.io/getting-started/installing/) for your platform. Note that, if you fail to install the *extended* version, you'll get errors transforming SCSS files.
2. [Install Node.js for your platform](https://nodejs.org/en/download/).
3. Optional but recommended: [Install Yarn for your platform](https://yarnpkg.com/en/docs/getting-started).
4. Run `yarn` or `npm install` to install asset-processing dependencies.
5. Run `hugo serve`.
6. Visit http://localhost:1313/pages/. Pages are updated live in your browser whenever content or layouts change.
7. Run `hugo` to build a final site for production. The pages are in the _public/_ directory.

## Layouts

The [layouts/ directory](layouts/) contains the page's header, footer, etc. See [these docs](https://gohugo.io/templates/lookup-order/) for indepth details of the lookup order.

In general, the header/footer is located in [layouts/_default/baseof.html](layouts/_default/baseof.html). The other files in that directory simply import this format and tell Hugo where to insert page content. Right now they're the same, but we have flexibility to override content for specific page types if needed. You're probably only interested in _baseof.html_ for now. It can either be edited by hand, or output via some other build process.

Hugo's template lookup order is a bit confusing. If you need some indication why a page isn't being rendered, run `hugo serve --debug` and Hugo tells you where it is searching for templates when rendering each page.

## Content

Content is stored below [content/](content/). Since we're putting static pages under a _pages/_ path in our site, there is a second directory to mirror this structure in the generated HTML. Again, here we have lots of flexibility. If you stick with the general format of the sample content I've created, you should be fine. If we need to deviate in some way, just let me know and I'll create a sample of how that might be done. The homepage is in a file called __index.md_, and _about.md_ contains another page.

## Stylesheets

Hugo has a [pipes feature](https://gohugo.io/hugo-pipes/) that lets us integrate various forms of asset processing. Essentially, anything under [assets](assets/) is processed and can be included in layouts. See the `<head>` section in [layouts/_default/baseof.html](layouts/_default/baseof.html) for an example of how to do this.

But, in general, [assets/main.scss](assets/main.scss) imports Bootstrap 4's SCSS files ande lets you override their defaults, add additional styles, etc. Feel free to incorporate other asset types, or ask me if something is needed and I'll take a crack at it.

## CSS Coding Style and Conventions

We use the [guidelines specified at the original project](https://github.com/loconomics/loconomics/blob/master/docs/Contributor%20Guidelines.md)
as a base here plus specifics for SASS, in short:

- All source files use 4 spaces indentation.
- UTF8 file encoding.
- [SUIT naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) for classes.
- Source wrote with SASS using the SCSS syntax and file extension.
- [SASS Guidelin styleguide](https://sass-guidelin.es/).
  - **Note:** This styleguide specifies 2 spaces indentation but we use 4 to keep consistent with the whole project.

Check discussion details about the topic at the [CSS Styling issue](https://github.com/loconomics/loconomics-pages/issues/20) and post there any question or request.
