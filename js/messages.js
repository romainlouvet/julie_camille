$.getJSON("http://localhost:8080/messages", function(data, status){
  console.log("Data: " + data + "\nStatus: " + status);
  console.log(data[0].text);
});
