import one              from '../css/images/bannerProducts/1.gif';
import eight            from '../css/images/bannerProducts/8.png';
import ac               from '../css/images/bannerProducts/ac.png';
import badminton        from '../css/images/bannerProducts/badminton.png';
import bag              from '../css/images/bannerProducts/bag.png';
import bike             from '../css/images/bannerProducts/bike.png';
import book             from '../css/images/bannerProducts/book.png';
import break_cleaner    from '../css/images/bannerProducts/break cleaner.png';
import camera           from '../css/images/bannerProducts/camera.png';
import canon_bag        from '../css/images/bannerProducts/canon bag.png';
import car              from '../css/images/bannerProducts/car.png';
import casual_shoes     from '../css/images/bannerProducts/casual shoes.png';
import coat             from '../css/images/bannerProducts/coat.png';
import cream            from '../css/images/bannerProducts/cream.png';
import cycle            from '../css/images/bannerProducts/cycle.png';
import egg              from '../css/images/bannerProducts/egg.png';
import formal_shoes     from '../css/images/bannerProducts/formal shoes.png';
import fridge           from '../css/images/bannerProducts/fridge.png';
import guitar           from '../css/images/bannerProducts/guitar.png';
import headphone        from '../css/images/bannerProducts/headphone.png';
import helmet           from '../css/images/bannerProducts/helmet.png';
import jeans            from '../css/images/bannerProducts/jeans.png';
import laptop           from '../css/images/bannerProducts/laptop.png';
import mobile_cover     from '../css/images/bannerProducts/mobile cover.png';
import mobile           from '../css/images/bannerProducts/mobile.png';
import printer          from '../css/images/bannerProducts/printer.png';
import red_mug          from '../css/images/bannerProducts/red mug.png';
import scooter          from '../css/images/bannerProducts/scooter.png';
import slipper          from '../css/images/bannerProducts/slipper.png';
import speaker          from '../css/images/bannerProducts/speaker.png';
import sunglasses       from '../css/images/bannerProducts/sunglasses.png';
import t_shirt          from '../css/images/bannerProducts/t shirt.png';
import toy              from '../css/images/bannerProducts/toy.png';
import tv               from '../css/images/bannerProducts/tv.png';
import usb_cable        from '../css/images/bannerProducts/usb cable.png';
import usb_drive        from '../css/images/bannerProducts/usb drive.png';
import washing_machine  from '../css/images/bannerProducts/washing machine.png';
import watch            from '../css/images/bannerProducts/watch.png';

import bgDefault        from '../css/images/webbackground/bgDefault.png';
import black            from '../css/images/webbackground/black.png';
import blue             from '../css/images/webbackground/blue.png';
import brown            from '../css/images/webbackground/brown.png';
import golden           from '../css/images/webbackground/golden.png';
import green            from '../css/images/webbackground/green.png';
import grey             from '../css/images/webbackground/grey.png';
import nature           from '../css/images/webbackground/nature.png';
import orange           from '../css/images/webbackground/orange.png';
import pencil           from '../css/images/webbackground/pencil.png';
import pink             from '../css/images/webbackground/pink.png';
import purple           from '../css/images/webbackground/purple.png';
import red              from '../css/images/webbackground/red.png';
import silver           from '../css/images/webbackground/silver.png';
import violet           from '../css/images/webbackground/violet.png';
import white            from '../css/images/webbackground/white.png';
import wooden           from '../css/images/webbackground/wooden.png';
import yellow           from '../css/images/webbackground/yellow.png';

let imgs = {
        one                 ,    
        eight               ,
        ac                  ,
        badminton           ,
        bag                 ,
        bike                ,
        book                ,
        break_cleaner       ,
        camera              ,
        canon_bag           ,
        car                 ,
        casual_shoes        ,
        coat                ,
        cream               ,
        cycle               ,
        egg                 ,
        formal_shoes        ,
        fridge              ,
        guitar              ,
        headphone           ,
        helmet              ,
        jeans               ,
        laptop              ,
        mobile_cover        ,
        mobile              ,
        printer             ,
        red_mug             ,
        scooter             ,
        slipper             ,
        speaker             ,
        sunglasses          ,
        t_shirt             ,
        toy                 ,
        tv                  ,
        usb_cable           ,
        usb_drive           ,
        washing_machine     ,
        watch               ,

        bgDefault           ,
        black               ,
        blue                ,
        brown               ,
        golden              ,
        green               ,
        grey                ,
        nature              ,
        orange              ,
        pencil              ,
        pink                ,
        purple              ,
        red                 ,
        silver              ,
        violet              ,
        white               ,
        wooden              ,
        yellow              ,
};

export const getImage = (key) => {
    return imgs[key];
};

export const baseUrl = 'https://api.dialogflow.com/v1/';
export const micIcon = '<i class="fa fa-microphone" aria-hidden="true"></i>';
export const accessToken = '679c60a910ea411d89eed1e199ddbb8e';
export const fixedMatrixVal = "matrix(1, 0, 0, 1, 0, 8.78)";