<?php

require_once("core/db.php");

$content = $mySQL->getRow("SELECT content FROM gb_blogcontent WHERE PageID={int} LIMIT 1", MODULE)['content'];

print gzdecode($content);

?>