<?php



$page->title = $page->header." — ".$page->SiteName;


//$logo = getimagesize($page->logo);


define("ADS", ($page->Ads=="YES") ? true : false);

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

$today = strtotime(date("d F Y", $page->created));

$feed = $mySQL->get("
SELECT PageID,created,header,subheader,landscape,portrait FROM gb_blogfeed
CROSS JOIN gb_pages USING(PageID)
WHERE created BETWEEN {int} AND {int} AND (Published & 2)
ORDER BY created DESC LIMIT 5",
$today, $today+86400);

foreach($feed as $i=>&$item){
	$item['entity'] = translite($item['header'])."-".$item['PageID'];
	$page->schemes['carousel']['itemListElement'][] = [
		"@type"=>"ListItem",
		"position"=>($i+1),
		"url"=>$page->root."".LANG_INDEX."/".$item['entity']
	];
}

define("TEMPLATE", $page->subtemplate);

include_once("themes/".THEME."/post.html");

?>