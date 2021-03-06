export default {
	height: 0,
	forceAuth: function() {
		window.parent.postMessage('Skill:ForceAuth', '*')
	},
	resized: function() {
		var height = 0

		function getBottom(elem) {
			var box = elem.getBoundingClientRect()

			var body = document.body
			var docEl = document.documentElement
			const computedStyle = window.getComputedStyle(elem)

			var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
			var clientTop = docEl.clientTop || body.clientTop || 0
			var top = box.top + scrollTop - clientTop
			var bottom =
				top +
				elem.clientHeight +
				parseFloat(computedStyle.paddingTop) +
				parseFloat(computedStyle.paddingBottom)

			return bottom
		}

		Array.from(
			window.document.body.getElementsByClassName('container')
		).forEach(container => {
			let bottom = getBottom(container)
			if (bottom > height) {
				height = bottom
			}
		})

		if (height != this.height) {
			this.height = height
			window.parent.postMessage(
				{
					name: 'Skill:Resized',
					height
				},
				'*'
			)
		}
	},
	back: function() {
		window.parent.postMessage('Skill:Back', '*')
	},
	ready: function() {
		this.resized()
		window.parent.postMessage(
			{
				name: 'Skill:Loaded',
				url: window.location.href
			},
			'*'
		)
		this.resizedInterval = setInterval(this.resized.bind(this), 50)
	}
}
