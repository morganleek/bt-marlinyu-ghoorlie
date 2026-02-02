import 'vite/modulepreload-polyfill';
import './style.scss';
import 'fslightbox';
// // GSAP
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

// Slider - Library import example
// import { tns } from "tiny-slider"

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

	// Copyright Year
	document.querySelectorAll(".copyright").forEach( ( p ) => { 
		p.innerHTML = p.innerHTML.replace( '{YEAR}', new Date().getUTCFullYear() );
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
	// 		const lightbox = new FsLightbox();
	// 		lightbox.props.sources = [e.target.closest( 'a' ).href];
	// 		lightbox.open();
	// 		console.log( lightbox.props.sources );
	// 	}
	// } );
});