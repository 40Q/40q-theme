<?php
$styles = [
	'button' => 'border border-black py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-fit',
	'text' => 'text-sm font-semibold',
	'type' => [
		'primary' => 'bg-white text-black hover:bg-gray-200',
		'secondary' => 'bg-black text-white hover:bg-gray-800',
	],
];

$styles['type'][$type] = $styles['type'][$type] ?? $styles['type']['primary'];
if ($linkType === 'post' && $linkId) {
	$href = get_permalink($linkId);
}
?>

<a href="<?php echo $href; ?>" class="<?php echo $styles['type'][$type] . ' ' . $styles['button']; ?>" <?php if ($openInNewTab) echo 'target="_blank"'; ?>>
	<span class="<?php echo $styles['text']; ?>"><?php echo $text; ?></span>
</a>
