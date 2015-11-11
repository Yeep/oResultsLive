var Result = function (config) {
	this.person = config.person;
	this.club = config.club;

	this.position = config.position;
	
	this.startTime = config.startTime;
	this.finishTime = config.finishTime;
	this.time = config.time;
	
	this.status = config.status;
	
	this.course = config.course;
	
	this.splits = config.splits;
};

Result.prototype.splitPairs = function () {
	var pairs = [];
	for (i = 1; i < this.splits.length; i++) {
		pairs.push({
			from: this.splits[i - 1].controlCode,
			to: this.splits[i].controlCode,
			time: this.splits[i].time - this.splits[i - 1].time
		});
	}
	return pairs;
};

module.exports = Result;