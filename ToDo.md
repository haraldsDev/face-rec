ToDo

add second button for Color Detection
	display the detected colors as warped percentages.

solve base64 problem for images

### standard model prediction

```
	app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
	      .then(generalModel => {
	        return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
	      })
	      .then(response => {
	        var concepts = response['outputs'][0]['data']['concepts']
	      })
```

### predict() for base64
```
	app.models.predict(Clarifai.GENERAL_MODEL, {base64: "G7p3m95uAl..."}).then(
	  function(response) {
	    // do something with response
	  },
	  function(err) {
	    // there was an error
	  }
	);
```


