<?php

$amount = 1000; 


$vatRate = 15; 

$vat = ($amount * $vatRate) / 100;

$totalAmount = $amount + $vat;

echo "Original Amount: $amount<br>";
echo "VAT (15%): $vat<br>";
echo "Total Amount (including VAT): $totalAmount";
?>
