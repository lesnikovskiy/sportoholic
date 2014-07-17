module.exports = (function () {
	return {
		getDaysInMonth: function (month, year) {
			return new Date(year, month, 0).getDate();
		},
		getMonthDays: function (jsMonth) {
			// important: this should be javascript zero based month number via Date.prototype.getMonth()
			return this.getDaysInMonth(new Date().getFullYear(), jsMonth + 1);
		}
	};
})();