import giftBanglesRed from "@/assets/gift-bangles-red.jpg";
import giftBanglesGold from "@/assets/gift-bangles-gold.jpg";
import giftBanglesPink from "@/assets/gift-bangles-pink.jpg";
import giftBanglesOrange from "@/assets/gift-bangles-orange.jpg";
import giftEmbroideryFrame01 from "@/assets/gift-embroidery-frame-01.png";
import giftEmbroideryFrame02 from "@/assets/gift-embroidery-frame-02.png";

import blouseYellowWork from "@/assets/blouse-yellow-work.jpg";
import blousePinkEmbroidery from "@/assets/blouse-pink-embroidery.jpg";
import blouseCreamBeadwork from "@/assets/blouse-cream-beadwork.jpg";
import blouseLilacWork from "@/assets/blouse-lilac-work.jpg";
import blouseGreenCutwork from "@/assets/blouse-green-cutwork.jpg";

import frockPrintedBeige from "@/assets/frock-printed-beige.jpg";
import frockPinkLace from "@/assets/frock-pink-lace.jpg";
import frockBlueGown from "@/assets/frock-blue-gown.jpg";

import kidsFloralBlue from "@/assets/kids-floral-blue.jpg";
import kidsPinkDress from "@/assets/kids-pink-dress.jpg";
import kidsRedSkirtSet from "@/assets/kids-red-skirt-set.jpg";
import kidsVelvetSet from "@/assets/kids-velvet-set.jpg";

export const PRODUCT_CATEGORIES = {
    GIFTS: "Customized Gifts",
    BLOUSES: "Blouses",
    FROCKS: "Frocks",
    KIDS: "Kids Fashion",
} as const;

export const products = {
    [PRODUCT_CATEGORIES.GIFTS]: [
        { src: giftBanglesRed, title: "Royal Coin Aari Bangles" },
        { src: giftBanglesGold, title: "Golden Mirror Work Bangles" },
        { src: giftBanglesPink, title: "Floral Pink Silk Bangles" },
        { src: giftBanglesOrange, title: "Bridal Silk Thread Set" },
        { src: giftEmbroideryFrame01, title: "Customized Embroidery Gifts" },
        { src: giftEmbroideryFrame02, title: "Customized Embroidery Gifts" },
    ],
    [PRODUCT_CATEGORIES.BLOUSES]: [
        { src: blouseYellowWork, title: "Yellow Cutwork Masterpiece" },
        { src: blousePinkEmbroidery, title: "Pink Royal Zardosi" },
        { src: blouseCreamBeadwork, title: "Cream Beadwork Classic" },
        { src: blouseLilacWork, title: "Lilac Dreams" },
        { src: blouseGreenCutwork, title: "Green Pattern Design" },
    ],
    [PRODUCT_CATEGORIES.FROCKS]: [
        { src: frockPrintedBeige, title: "Printed Beige Frock" },
        { src: frockPinkLace, title: "Pink Lace Frock" },
        { src: frockBlueGown, title: "Blue Party Gown" },
    ],
    [PRODUCT_CATEGORIES.KIDS]: [
        { src: kidsFloralBlue, title: "Floral Twin Set" },
        { src: kidsPinkDress, title: "Pink Princess Dress" },
        { src: kidsRedSkirtSet, title: "Traditional Skirt Set" },
        { src: kidsVelvetSet, title: "Velvet & Gold Ensemble" },
    ],
};

export const featuredProducts = [
    { src: blouseYellowWork, title: "Yellow Cutwork Masterpiece" },
    { src: blousePinkEmbroidery, title: "Pink Royal Zardosi" },
    { src: blouseCreamBeadwork, title: "Cream Beadwork Classic" },
    { src: blouseLilacWork, title: "Lilac Dreams" },
    { src: blouseGreenCutwork, title: "Green Pattern Design" },
];

export const getAllProducts = () => {
    return Object.values(products).flat();
};
