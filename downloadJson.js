Users = new Mongo.Collection("users");
if (Meteor.isClient) {
 Template.hello.events({
    'click #downloadFile': function(event) {
      event.preventDefault();
      Meteor.call('getAllUsers', function(error, result){
        if(error){
          return error;
        }
        else{
            var data = JSON.stringify(result);
            var filename = "export.json" ;
            downloadLocalResource(data, filename, "application/json");
        }
      });
    }
 })
  var downloadLocalResource = function(data, filename, mimeType) {
    filename = filename || "download";
    mimeType = mimeType || "application/json";
    var bb = new Blob([data], { type: mimeType });
    var link = document.createElement("a");
    link.download = filename;
    link.href= window.URL.createObjectURL(bb);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    getAllUsers: function(){
      var data = Users.find({}).fetch();
      return data;
    }
  });
}
