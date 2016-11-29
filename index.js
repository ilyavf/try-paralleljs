// Ex1:
var p0 = new Parallel([1, 2, 3, 4, 5]);
console.log(p0.data); // prints [1, 2, 3, 4, 5]

// Ex2:
var p1 = new Parallel('forwards');
// Spawn a remote job (we'll see more on how to use then later)
p1.spawn(function (data) {
	data = data.split('').reverse().join('');
	return data;
}).then(function (data) {
	console.log(data); // logs sdrawrof
});


// Ex3:
var slowSquare = function (n) {
	var i = 0;
	while (++i < n) {}
	return i;
};
var timeoutLog = function(n) {
	if (n === 0) return;
	setTimeout(function () {
		console.log('timeout...');
		timeoutLog(n - 1);
	}, 0);
};
// Create a job
var n = 1000;
var p = new Parallel(n*n*n);
// Spawn our slow function
p.spawn(slowSquare).then(function (data) {
	console.log(data);
});
timeoutLog(n/2);