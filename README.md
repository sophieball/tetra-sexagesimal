# Tetra-sexagesimal
A tetra-sexagesimal and decimal converter

## What is Tetra-sexagesimal?

Tetra-sexagesimal is a number system that is base 64. 
The digits include 0-9 and a whole deck of poker cards as listed out below:

0 1 2 3 4 5 6 7 8 9

♦️A ♦️2 ♦️3 ♦️4 ♦️5 ♦️6 ♦️7 ♦️8 ♦️9 ♦️10 ♦️J ♦️Q ♦️K

♣️A ♣️2 ♣️3 ♣️4 ♣️5 ♣️6 ♣️7 ♣️8 ♣️9 ♣️10 ♣️J ♣️Q ♣️K

♥️A ♥️2 ♥️3 ♥️4 ♥️5 ♥️6 ♥️7 ♥️8 ♥️9 ♥️10 ♥️J ♥️Q ♥️K

♠️A ♠️2 ♠️3 ♠️4 ♠️5 ♠️6 ♠️7 ♠️8 ♠️9 ♠️10 ♠️J ♠️Q ♠️K

### 🃏
🃏

Note: Depending on your level of expertice on poker card, the order of ♦️ and ♣️ may be different.

## Convesion between tetra-sexagesimal and decimal

This is similar to conversions between any number systems.
Our converter has two components: the JavaScript part that does the conversion and the HTML part that does the I/O.

## Different dialects

Firstly, you need to determine the suit ranking.
The ranking can be alphabetical (♣️, ♦️, ♥️, ♠️), reversed-alphabetical (♠️, ♥️, ♦️, ♣️), or alternating-colours (♦️, ♣️, ♥️, ♠️).
Also, to some people, Ace is larger than K.
Our converter supports different dialects and can provide translation between them. 

## Typing tetra-sexagesimal with a standard keyboard

Except for the ten arabic numbers (0-9), the poker cards are typed using key sequences. 

♣️ is typed with C

♦️ is typed with D

♥️ is typed with H

♠️ is typed with S

10 in a card suit is typed with T

Two jokers are typed with JH and JL (as high and low)

For example, a whole suit of ♣️ can be written as:

CA C2 C3 C4 C5 C6 C7 C8 C9 CT CJ CQ CK

## Examples

Suppose we choose the alternating colour (♦️, ♣️, ♥️, ♠️) ranking and Ace goes before K.

Decimal -> Tetra-sexagesimal -> typing

0 (DEC) -> 0 (TET) -> 0

10 (DEC) -> ♦️A (TET) -> DA

19 (DEC) -> ♦️10 (TET) -> DT

63 (DEC) -> 🃏(TET) -> JL

64 (DEC) -> 10 (TET) -> 10

100 (DEC) -> 1♣️K (TET) -> 1CK

129 (DEC) -> 21 (TET) -> 21

256 (DEC) -> 40 (TET) -> 40

1024 (DEC) -> ♦️70 (TET) -> D70

4096 (DEC) -> 100 -> 100

262,144 (DEC) -> 1000 -> 1000

Do you see the biggest advantage of tetra-sexagesimal? It's so compact!!!

## Other possible number systems

TBD
