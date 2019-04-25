let model = tf.sequential();


let setuped = false

function setup() {
    setuped = true
    document.getElementById("train").disabled = false
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
    document.getElementById("train").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Training...'
    const xs = tf.tensor2d([
    	[1, 0, 0], // 1 0 0 | 1 1 0 | 1 1 1 | 0 1 1 | 0 0 1 | 0 0 0 | 1 0 1 | 0 1 0
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
    document.getElementById("train").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Training...'
    model.fit(xs, ys, {epochs: document.getElementById("epochsRange").value}).then(()=>{
    	console.log("Trained !")
        document.getElementById("train").innerHTML = 'Start train !'
        document.getElementById("predict").disabled = false
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