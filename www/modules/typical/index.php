<?php

$logo = getimagesize($page->logo);

define("ADS", true);

$today = mktime(0,0,0);
$date = date("j-F-Y", $today);
$date = explode("-",$date);

$keywords = $mySQL->getGroup("SELECT KeyWORD FROM gb_keywords ORDER BY rating DESC LIMIT 8")['KeyWORD'];

/* BREAD CRUMBS ******************************************/

$page->schemes['breadcrumbs']['itemListElement'][] = [
	"@type"=>"ListItem",
	"position"=>2,
	"name"=>$page->header,
	"item"=>$page->canonical
];

/* Template **********************************************/

define("TEMPLATE", $page->template);

include_once("themes/".THEME."/post.html");

?>