<script lang="ts">
	import type { Post } from '$models/Post.js';
	import UserData from './UserData.svelte';
	import Content from './Content.svelte';
	import Actions from './Actions.svelte';

	export let post: Post;
	$: ({ id, user, postedAt, text, imagePaths, likes } = post);
</script>

<!--
@component

Renders an all-included post with metadata and buttons.

There are three distinct sections.

__The first section displays:__
* The poster's avatar
* The poster's nickname
* The date of the post

__The second section displays either a text and/or (an) image(s):__
* If a text is set, it shows up as standalone if no images was provided
* If there's a least 1 image: displays an image carousel if there are multiple images, or a static image placeholder if there is one
* When both are set, the text is displayed under the image(s)

__The third section displays:__
* The like count of the post
* 3 buttons : like, bookmark and open the comments section

-->

<div class="relative w-full flex flex-col">
	<UserData user={user} postedAt={new Date(postedAt)} />
	<Content text={text} imagePaths={JSON.parse(imagePaths)} />
	<Actions {id} likes={likes} />
</div>
