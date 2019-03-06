# [james-frowen.github.io](https://james-frowen.github.io)

theme source [tactile](https://github.com/pages-themes/tactile)


### Local Setup

- Install Ruby
- `gem install bundler`
- `bundle install`
  - for live reload to work
  - `gem install eventmachine --platform ruby`
  - `bundle lock --add-platform ruby`
  - `gem uninstall eventmachine -I` to uninstall wrong version
- Install Node and Typescript
- `npm install`

### Run locally

`tsc -w`

`bundle exec jekyll serve -I --livereload` from bash


typescript files are found in the `_ts_src` dir

