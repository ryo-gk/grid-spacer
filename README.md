# Grid Spacer

Fill in the space with the blocks when you use CSS Grid Layout.

## Usage

```bash
npm i grid-spacer
```

You can use this like the follow example:

```javascript
const { execute } = useGrid({
  containerClass: 'container', // this is required.
  spacerClass: 'box', // default is 'spacer'.
  spacerTag: 'div', // default is 'div'.
  type: 'fill' // default is 'fill'. You can use 'fill' or 'fit'.
})

// Call `execute` after the page is rendered. 
execute()
```

```html
<html>
  <head>...</head>
  <body>
    <div class="container">
      <div class="box" />
      <div class="box" />
      <div class="box" />
      <div class="box" />
      <div class="box" />
    </div>
    <script ...></script>
  </body>
</html>

```