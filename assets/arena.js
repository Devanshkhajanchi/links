let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// CHANNEL SLUG
let channelSlug = 'lost-in-translation-nrt9qfynwhg'

// MODAL
// let myModal = document.getElementById('modal')

// function hideModal() {
// 	myModal.style.display = "none";
// }

// function appModal(){
// 	myModal.style.display = "block"
// }


// Basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link')
	let blockName = document.getElementById('title')
	let ownerName = document.getElementById('channel-owner')


	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
	ownerName.innerHTML = data.owner.slug
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	let modalTitle = document.getElementById("modal-title")
	let modalAlt = document.getElementById("modalAlt")
	let modalDesc = document.getElementById("modal-desc")

	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')


	// LINKS
	if (block.class == 'Link') {

		let linkItem =
			`
			<li>
				<div class="wrapper">
					<picture>	
						<source srcset="${ block.image.large.url }">
						<source srcset="${ block.image.thumb.url }">
						<img src="${ block.	image.original.url }">
					</picture>
					<div class="container-title">
						<h3>${ block.title }</h3>
					</div>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		console.log('block', block)
	}


	// IMAGES
	else if (block.class == 'Image') {

		let imageItem = 
		`
		<li class="image-block">
			<button>
				<div class="wrapper">
					<picture> 
						<img src="${ block.image.large.url }">
					</picture>
					<div class="container-title">
						<h3> ${ block.title } <h3>
					</div>
				</div>
			</button>
			<dialog class="modal-styling">
				<p>hello</p>
				<button class="close"> Close </button>
			</dialog>
		</li>
		`


		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		console.log('image')
	}


	// TEXT
	else if (block.class == 'Text') {
		// …up to you!

		let textItem =
		`
		<li class="uploaded-text">
			<p>
				${ block. content}
			</p>
		</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', textItem)

		console.log('text')
	}


	// ALL UPLOADED MEDIA

	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type

		// UPLOADED VIDEOS
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li class="uploaded-video">
					<p><em>Video</em></p>
					<video controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
		}


		// UPLOADED PDFS
		else if (attachment.includes('pdf')) {
			
		let pdfItem =
		`
					<li class="uploaded-pdf">
				
						<div class="wrapper">
							<picture> 
								<img src="${ block.image.original.url }">
							</picture>
							<div class="container-title">
								<h3> ${ block.title } </h3>
							</div>
						</div>
					</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

		}


		// UPLOADED AUDIO
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li class="uploaded-audio">
					<p><em>Audio</em></p>
					<audio controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
		}
	}


	// ALL LINKED MEDIA
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// LINKED VIDEO
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
					<li class="linked-video">
						<div class="wrapper">
							<picture> 
								<img src="${ block.image.original.url }">
							</picture>
							<div class="container-title">
								<h3> ${ block.title } <h3>
							</div>
						</div>
					</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// LINKED AUDIO
		else if (embed.includes('rich')) {
		let linkedAudioItem = 
			`
					<li class="linked-audio">
				
						<div class="wrapper">
							<picture> 
								<img src="${ block.image.original.url }">
							</picture>

							<div class="container-title">
								<h3> ${ block.title } <h3>
							</div>
						</div>
					<li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)

		}
	}
}




let initInteraction = () => {
	let  linkBlocks = document.querySelectorAll('.link-block')
	linkBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		console.log(dialog)
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal()
			console.log('hello world')
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  imageBlocks = document.querySelectorAll('.image-block')
	imageBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  textBlocks = document.querySelectorAll('.text-block')
	textBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  videoBlocks = document.querySelectorAll('.video-block')
	videoBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal();

		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  audioBlocks = document.querySelectorAll('.audio-block')
	audioBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')


		openButton.onclick = () => {
			dialog.showModal();

		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  mediaBlocks = document.querySelectorAll('.media-block')

	mediaBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  pdfBlocks = document.querySelectorAll('.pdf-block')
	pdfBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')


		openButton.onclick = () => {
			dialog.showModal();

		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})
}


// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		initInteraction()

		// Also display the owner and collaborators:
		let channelUsers = document.getElementById('channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})