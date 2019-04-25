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
    let logicInputs = [
        document.getElementById("logicInput1").value.split(""),
        document.getElementById("logicInput2").value.split(""),
        document.getElementById("logicInput3").value.split(""),
        document.getElementById("logicInput4").value.split("")
    ]
    const xs = tf.tensor2d([
    	[parseInt(logicInputs[0][0]), parseInt(logicInputs[0][1]), parseInt(logicInputs[0][2])],
    	[parseInt(logicInputs[1][0]), parseInt(logicInputs[1][1]), parseInt(logicInputs[1][2])],
    	[parseInt(logicInputs[2][0]), parseInt(logicInputs[2][1]), parseInt(logicInputs[2][2])],
    	[parseInt(logicInputs[3][0]), parseInt(logicInputs[3][1]), parseInt(logicInputs[3][2])]
    	])
    const ys = tf.tensor1d([
    	parseInt(document.getElementById("resultInput1").value),
        parseInt(document.getElementById("resultInput2").value),
        parseInt(document.getElementById("resultInput3").value),
        parseInt(document.getElementById("resultInput4").value)
    	]) 
    document.getElementById("train").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Training...'
    model.fit(xs, ys, {epochs: document.getElementById("epochsRange").value}).then(()=>{
        document.getElementById("train").innerHTML = 'Start train !'
        document.getElementById("predict").disabled = false
    })

}

function startPredict() {
    let resultInputs = [
        parseInt(document.getElementById("logicInputForResult").value.split("")[0]),
        parseInt(document.getElementById("logicInputForResult").value.split("")[1]),
        parseInt(document.getElementById("logicInputForResult").value.split("")[2])
    ]
	const data = tf.tensor2d([
		[resultInputs[0], resultInputs[1], resultInputs[2]]
	])
	let result = model.predict(data)
    document.getElementById("result-modal-body").innerHTML = "The neural network predicted : "+result.toString()
    $('#exampleModal').modal('show')
}