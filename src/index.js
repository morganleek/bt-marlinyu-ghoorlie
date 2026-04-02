import 'vite/modulepreload-polyfill';
import './style.scss';

// import 'node_modles/fslightbox';
// import GLightbox from 'glightbox';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const stripslashes = ( s ) => {
	return s.replace(/\\(.)/g, '$1');
}

document.addEventListener('DOMContentLoaded', () => {
	// Lazy load fade in
	document.querySelectorAll( 'img[loading="lazy"]' ).forEach( ( img ) => {
		if( img.complete === true ) {
			img.classList.add( 'has-loaded' );
		}
		img.addEventListener( "load", ( e ) => {
			e.target.classList.add( 'has-loaded' );
		} );
	} );

	// Smooth scroll hashes
	document.querySelectorAll( "a" ).forEach( link => {
		const split = link.href.split( "#" );
		if( 
			split.length === 2 && 
			stripslashes( split[0]) === stripslashes( `${window.location.origin}${window.location.pathname}` ) && 
			split[1].length > 0 &&
			document.querySelector( `#${split[1]}` ) 
		) {
			link.addEventListener( "click", ( e ) => {
				e.preventDefault();
				document.querySelector( `#${split[1]}` ).scrollIntoView( { behavior: 'smooth', inline: 'start' } );
			} );
		}
	} );

	// Copyright Year
	document.querySelectorAll(".copyright").forEach( ( p ) => { 
		p.innerHTML = p.innerHTML.replace( '{YEAR}', new Date().getUTCFullYear() );
	} );

	document.body.addEventListener( "mouseenter", e => {
		if( e.target.matches( "img" ) && e.target.getAttribute("alt").length > 0 && e.target.closest( ".wp-block-mgcat-training" ) !== null ) {
			const img = e.target;
			const toolTip = document.createElement( "span" );
			toolTip.classList.add( "tool-tip" );
			toolTip.innerHTML = img.getAttribute("alt");
			img.parentNode.appendChild( toolTip );

			img.addEventListener( "mouseleave", () => {
				toolTip.remove();
			} );
		}
	}, { capture: true } );

	// Main menu scroll appearance
	let top = 20;
	if( !isNaN( parseInt(getComputedStyle(document.documentElement).getPropertyValue('--wp-admin--admin-bar--height').trim())) ) {
		top -= parseInt(getComputedStyle(document.documentElement).getPropertyValue('--wp-admin--admin-bar--height').trim());
	}
	
	gsap.timeline({
		scrollTrigger: {
			scrub: 1,
			trigger: '.wp-site-blocks',
			start: `${top}px top`,
			// markers: true,
			endTrigger: 'footer',
			end: 'bottom top',
			onToggle: (self) => document.body.classList.toggle( "is-scrolled", self.isActive )
		},
	});

	// Close when modal is open and clicked outside of
	document.body.addEventListener( "click", e => {
		if( 
			document.body.classList.contains( "show-modal" ) && 
			e.target.closest( ".modal" ) === null
		) {
			document.body.classList.remove( "show-modal" );
		}
	} );

	// Modal close button
	document.querySelectorAll( ".modal-outer .modal" ).forEach( modalOuter => {
		const closeButton = document.createElement( "button" );
		closeButton.classList.add( "close-button" );
		closeButton.addEventListener( "click", () => {
			document.body.classList.remove( "show-modal" );
		} );
		modalOuter.appendChild( closeButton );
	} );

	// Product catalogue buttons 
	document.querySelectorAll( ".show-modal a" ).forEach( button => {
		button.addEventListener( "click", e => {
			e.preventDefault();
			setTimeout( () => document.body.classList.add( "show-modal" ), 100 );
		} );
	} );

	// // Animate on Scroll
	// document.querySelectorAll( ".wp-block-mgcat-training h1, .wp-block-mgcat-training h2, .wp-block-mgcat-training h3, .wp-block-mgcat-training h4, .wp-block-mgcat-training h5, .wp-block-mgcat-training h6, .wp-block-mgcat-training p, .wp-block-mgcat-training .wp-block-list, .wp-block-mgcat-training .wp-block-embed, .wp-block-mgcat-training .wp-block-image, .wp-block-mgcat-training .wp-block-pullquote, .wp-block-mgcat-training .wp-block-group.has-white-background-color:has(.wp-block-audio)" ).forEach( block => {
	// 	ScrollTrigger.create({
	// 		trigger: block,
	// 		start: 'top bottom-=100px',
	// 		endTrigger: block,
	// 		end: '75% top',
	// 		scrub: 0.2,
	// 		toggleClass: "is-visible",
	// 		invalidateOnRefresh: true,
	// 		once: true,
	// 		markers: true,
	// 	} );
	// } );

	// Video lightbox
	// document.body.addEventListener( "click", e => {
	// 	if( e.target.closest( '.wp-block-image' ) && e.target.closest( 'a' ) ) {
	// 		e.preventDefault();
	// 		const source = e.target.closest( 'a' ).href;
	// 		const myGallery = GLightbox( {
	// 			elements: [
	// 				{
	// 					'href': source,
	// 					'type': 'video',
	// 					'source': 'vimeo', //vimeo, youtube or local
	// 					'width': 900,
	// 				}
	// 			],
	// 			autoplayVideos: true,
	// 		} );
	// 		myGallery.open();
	// 	}
	// } );
});