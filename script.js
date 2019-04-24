let model = tf.sequential();


function setup() {
	model = tf.sequential();
	const hiddenLayer = tf.layers.dense({
    units: parseInt(document.getElementById("neuronsRange").value),
    inputShape: [3],
    activation: "sigmoid"
	})

	const outputLayer = tf.layers.dense({
	    units: 1,
	    activation: "sigmoid"
	})

	model.add(hiddenLayer);
	model.add(outputLayer);

	model.compile({
	    optimizer: "adam",
	    loss: tf.losses.softmaxCrossEntropy
	})
}

function startTrain() {
    const xs = tf.tensor2d([
    	[1, 0, 0],
    	[1, 1, 0],
    	[1, 1, 1],
    	[0, 1, 1],
    	[0, 0, 1]
    	])
    const ys = tf.tensor1d([
    	0,
    	1,
    	1,
    	1,
    	0
    	])
    model.fit(xs, ys, {epochs: document.getElementById("epochsRange").value}).then(()=>{
    	console.log("Trained !")
    	document.getElementById("result").innerHTML = "Trained !"
    })
}

function startPredict() {
	const data = tf.tensor2d([
		[0, 0, 0]
	])
	let result = model.predict(data)
	console.log("Result : "+result.toString())
	document.getElementById("result").innerHTML = "Result : "+result.toString()

}