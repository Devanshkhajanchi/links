let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// CHANNEL SLUG
let channelSlug = 'lost-in-translation-nrt9qfynwhg'

// MODAL
let myModal = document.getElementById('modal')

function hideModal() {
	myModal.style.display = "none";
}

function appModal(){
	myModal.style.display = "block"
}


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

	// let blockTitle = `
	// 	<p> ${ block.title } <p>
	// 	`
	// 	channelBlocks.insertAdjacentElement('beforeend', blockTitle)



	// LINKS
	if (block.class == 'Link') {


		let linkItem =
			`
			<li onclick="appModal()"> 
				<h3> ${ block.title } <h3>
				<p><em>Link</em></p>
				<picture>
					<source srcset="${ block.image.thumb.url }">
					<source srcset="${ block.image.large.url }">
					<img src="${ block.	image.original.url }">
				</picture>
				<h3>${ block.title }</h3>
				${ block.description_html }
				<p><a href="${ block.source.url }">See the original ↗</a></p>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		console.log('block', block)
	}


	// IMAGES
	else if (block.class == 'Image') {

		let imageItem = 
		`
		<li onclick="appModal()">
		
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
		modalTitle.innerHTML = block.title
		modalDesc.innerHTML = block.description
		// modalAlt.innerHTML = block.


		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		console.log('image')
	}


	// TEXT
	else if (block.class == 'Text') {
		// …up to you!

		let textItem =
		`
		<li>
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
		let attachment = block.attachment.content_type // Save us some repetition


		// UPLOADED VIDEOS
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li>
					<p><em>Video</em></p>
					<video controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}


		// UPLOADED PDFS
		else if (attachment.includes('pdf')) {
			
		let pdfItem =
		`
					<li onclick="appModal()">
				
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
		channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

		}


		// UPLOADED AUDIO
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<p><em>Audio</em></p>
					<audio controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
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
					<li onclick="appModal()">
				
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
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// LINKED AUDIO
		else if (embed.includes('rich')) {
		let linkedAudioItem = 
			`
					<li onclick="appModal()">
				
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


// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
			<img src="${ user.avatar_image.display }">
			<h3>${ user.first_name }</h3>
			<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
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

		// Also display the owner and collaborators:
		let channelUsers = document.getElementById('channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})