module.exports = {
  scripts: [
  ],

  styles: [
    <% if(appIncludes.indexOf('scaffolding')>-1){%>
      'bower_components/twg-frontend-scaffolding/dist/_scaffolding.styl' 
    <%}%>
  ]
};