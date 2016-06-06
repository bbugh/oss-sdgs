var blockspring = require('blockspring');

blockspring.define(function(request, response) {
  var query = "SELECT A, B, C, D, E, F, G, H, I, J, K, L";

  var search_text = request.params["search_text"];
  if (search_text) {
    query += " WHERE (B contains '" + search_text +
      "' OR C contains '" + search_text +
      "' OR L contains '" + search_text + "')"
    // query += " WHERE (B MATCHES '(?i).*" + search_text +
    //   ".*' OR C MATCHES '(?i).*" + search_text +
    //   ".*' OR L MATCHES '(?i).*" + search_text + ".*') ";
  }

  var goals = request.params["goals"];
  if (goals) {
    query += (search_text) ? " AND " : " WHERE ";
    // result includes matches for ANY of the goals:
    // query += " G MATCHES '.*(" + goals + ").*' "

    // result only includes matches for ALL of the goals:
    query += " (G contains '" + goals.split("|").join("' AND G contains '") + "')"
  }

  var limit = request.params["limit"];
  if (limit) {
    query += " LIMIT " + Math.min(Math.max(parseInt(limit), 1), 20) + " ";
  }

  var offset = request.params["offset"];
  if (offset) {
    query += " OFFSET " + offset;
  }

  blockspring.runParsed("query-google-spreadsheet", {
      "query": query,
      "url": "https://docs.google.com/spreadsheets/d/19RgiAqxskAqaBjZrB8HWBKpuhX_k3t6ik_wYfVbMKqQ/edit#gid=1218588397"
    },
    { cache: true, expiry: 7200},
    function(res) {
      var entries = res.params.data.map(function(currentValue, index, array) {
        return {
          "projectName": currentValue["Project Name"],
          "timestamp": currentValue["Timestamp"],
          "description": currentValue["Description"],
          "repoUrl": currentValue["Code Repository URL"],
          "demoUrl": currentValue["Demo or Website URL"],
          "imageUrl": currentValue["Image URL"],
          "relatedSdgs": currentValue["Related SDGs"],
          "projectChampion": currentValue["Project Champion Individual(s) or Organization(s)"],
          "entrarName": currentValue["Your Name"],
          "entrarEmail": currentValue["Your Email or URL"],
          "comments": currentValue["Additional Comments"],
          "tags": currentValue["Descriptive tags (comma separated, please)"]
        }
      });

      response.addOutput("query", query);
      response.addOutput("entries", entries);
      response.end();
  });
});
