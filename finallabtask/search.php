<?php
$array = [5, 12, 8, 20, 7];
$search = 8;
$found = false;

for ($i = 0; $i < count($array); $i++) {
    if ($array[$i] == $search) {
        $found = true;
        break;
    }
}

if ($found) {
    echo "$search is found in the array";
} else {
    echo "$search is not found in the array";
}
?>
