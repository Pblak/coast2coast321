<template>

    <div class="relative h-screen flex text-gray-700">
        <div
            class="flex flex-col h-full sm:flex-row items-center md:items-start sm:justify-center
            md:justify-start flex-auto min-w-0 bg-white">
            <div class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-end justify-end p-10 pr-20
                overflow-hidden  text-white relative bg-gradient-to-l from-cyan-600 to-emerald-400"  >
                <div class="w-full z-10 mb-20 flex justify-center absolute top-10 right-0 left-0">
                    <div id="dicton_container" class="w-3/5 text-center text-3xl font-extralight leading-tight mb-6">

                    </div>
                </div>
                <div class="absolute inset-0 z-0  bg-no-repeat bg-contain bg-bottom"
                     :style="'background-image: url('+landingIcon+');'"></div>
                <!---remove custom style-->
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div
                class="flex overflow-auto justify-center w-full sm:w-auto md:h-full  xl:w-2/5 p-8
                md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                <div class="max-w-lg w-full flex flex-col space-y-8">
                    <div class=" ">
                    </div>
                    <div>
                        <div class="sm:text-sm xl:text-md text-gray-500 font-normal">

                        </div>
                    </div>
                    <div class="flex ">
                        <div class="w-full md:w-1/2  mb-6 md:mb-0">
                            <router-link :class="[$route.name === 'login_cPanel'?
                            'border-fuchsia-500 text-fuchsia-500  border-b-4':'text-gray-400 border-b']"
                                         :to="{name:'login_cPanel'}"
                                         class="w-full flex items-center justify-center
                                         border-gray-300 p-3 cursor-pointer "
                                         type="submit">
                                <i class="fa-solid fa-gauge-simple mr-2"></i> Login
                            </router-link>
                        </div>
                        <div class="w-full md:w-1/2  mb-6 md:mb-0">
                            <router-link :class="[$route.name === 'register_cPanel'?
                            'border-fuchsia-500 text-fuchsia-500  border-b-4':'text-gray-400 border-b']"
                                         :to="{name:'register_cPanel'}"
                                         class="w-full flex items-center justify-center
                                         border-gray-300 p-3 cursor-pointer "
                                         type="submit">
                                <i class="fa-solid fa-gauge-simple mr-2"></i> Registeur
                            </router-link>
                        </div>
                    </div>
                    <router-view name="Auth"></router-view>
                    <div class=" text-center text-gray-500 text-xs">
                        Copyright © 2021-2022
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import landingIcon from '@/../images/kanban_method-bro.svg'

export default {
    name: "login",
    methods: {
        setRandom() {
            this.selected = anime.random(0, this.dicton.length - 1)
            return this.dicton[this.selected]
        },
    },
    data() {
        return {
            selected: 0,
            dicton: [
                'Vis comme si tu devais mourir demain, apprends comme si tu devais vivre toujours - Ghandi',
                'Le succès n\'est pas final, l\'échec n\'est pas fatal. C\'est le courage de continuer qui compte - Winston Churchill.',
                'Tout est possible à qui rêve, ose, travaille et n\'abandonne jamais - Xavier Dolan',
                'La seule limite à notre épanouissement de demain sera nos doutes d\'aujourd\'hui - Franklin Roosevelt.',
                'Ceux qui ne font rien ne se trompent jamais - Théodore de Banville.',
                'Je ne perds jamais. Soit je gagne, soit j\'apprends - Nelson Mandela',
            ],
            str: '',
            landingIcon,
        }
    },
    mounted() {
        let _this = this
        _this.str = _this.setRandom()
        let smooth_update = anime({
            targets: '#dicton_container',
            opacity: [1,0],
            loop:true,
            duration: 2000,
            easing:'linear',
            direction: 'alternate',
            loopComplete: function(anim) {
                if(anim.animatables[0].target.style.opacity === 0){
                    _this.str = _this.setRandom()
                }
            },
        })
    }
}

</script>

<style>
/*remove custom style*/
.circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(254, 252, 191, 0.5);
    animation: animate 25s linear infinite;
    bottom: -150px;
}

.circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}

@keyframes animate {

    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 70%;
    }

}
</style>
