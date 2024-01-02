<template>

    <div class="h-screen bg-white text-gray-900 " v-if="competition">
        <div class="grid lg:grid-cols-10 gap-6 p-6 ">
            <div class="lg:col-span-full ">
                <h1 class="text-2xl text-slate-700 font-black uppercase">participer à cette compétition</h1>
            </div>
            <hr class="col-span-full border-slate-300 ">
            <div class="lg:col-span-6 lg:row-span-2 flex flex-col items-between gap-6 lg:pt-20  md:pt-10  ">
                <div class="flex flex-wrap gap-4">
                    <div
                        class="w-72 h-72  bg-center bg-cover rounded-lg"
                        :style="competition.avatar?'background-image:url('+competition.avatar+')':
                                       'background-image:url(https://flowbite.com/docs/images/examples/image-3@2x.jpg)'">
                    </div>
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="text-8xl font-bold w-fit">
                            <p class="bg-clip-text uppercase text-transparent bg-gradient-to-l from-pink-700 to-rose-400">
                                {{ competition.name }}
                            </p>
                        </div>
                        <div
                            class=" text-start   p-4 flex flex-col gap-2 bg-slate-100 rounded-lg shadow text-sm">
                            <div class="  items-center">
                                <p class="text-xl font-thin">Description: </p>
                            </div>
                            {{ competition.description }}
                        </div>
                        <div v-if="!inTime()"
                             class=" text-start w-fit  p-2  flex flex items-center gap-2 bg-blue-200 rounded-full shadow text-sm">
                            <i class="fa fa-info-circle fa-lg text-blue-600"></i>
                            <p>Le concours va commencer </p>
                            <p class="text-blue-600 font-black"> {{ time_format(competition.period.from) }}</p>
                        </div>
                        <div class="flex flex-col gap-4 py-6 flex-1 p-4 " v-if="inTime()">
                            <div class="  items-center">
                                <p class="text-xl font-thin">Period: </p>
                            </div>
                            <div class="flex flex-wrap gap-4">

                                <div class=" flex justify-center flex-col gap-6 flex-1">
                                    <div class="_btn _btn-default text-xl text-center dark:bg-gray-900">
                                        {{ time_format(competition.period.from, false, 'fr', 'dddd DD MMM YY') }}
                                    </div>
                                    <div class="text-center text-5xl">
                                        {{ time_format(competition.period.from, false, 'fr', 'HH:mm') }}
                                    </div>
                                </div>
                                <div class=" flex justify-center flex-col gap-6 flex-1">
                                    <div class="_btn _btn-default text-xl text-center  dark:bg-gray-900">
                                        {{ time_format(competition.period.to, false, 'fr', 'dddd DD MMM YY') }}
                                    </div>
                                    <div class="text-center text-5xl">
                                        {{ time_format(competition.period.to, false, 'fr', 'HH:mm') }}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="flex-col flex gap-2 bg-slate-100   border border-gray-200 p-6 rounded-xl">
                    <div class="flex flex-wrap gap-4 items-center">
                        <p class="text-xl font-thin">Apropos des livres: </p>
                    </div>
                    <div class="overflow-x-auto overflow-y-auto  ">
                        <div class="flex gap-4 py-4  text-slate-700">
                            <div v-for="book in competition.allBooks"
                                 class="flex-none ">
                                <div class=" p-1.5 flex bg-slate-300 gap-2 rounded-full items-center">
                                    <div
                                        class=" w-8 h-8 flex justify-center bg-slate-600 text-gray-50 rounded-full items-center bg-cover bg-center">
                                        <i class="fa-duotone fa-book-open-cover"></i>
                                    </div>
                                    <div class="gap-1.5 flex flex-1 items-center justify-between">
                                        <span class=" text-sm font-black">{{ book.name }}</span>
                                        <span class=" text-xs text-gray-500 capitalize pr-2">
                                            {{ initialsToName(book.local) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-4  flex flex-col gap-4">

                <div v-if="inTime()"
                     class="flex-col flex gap-2   p-6 rounded-xl
                     bg-gradient-to-br from-indigo-500/80 from-00% via-sky-500/80 via-50% to-emerald-500/80 to-100%">
                    <div class="flex flex-wrap gap-4 items-center text-white ">
                        <p class="text-xl font-thin">Quiz :</p>
                    </div>
                    <div class="overflow-x-auto overflow-y-auto  ">
                        <div class="flex gap-4  py-4">
                            <div v-for="quiz in competition.quizzes"
                                 class="p-1.5 flex-none bg-slate-300 flex gap-4 items-center whitespace-nowrap rounded-full w-fit
                                    relative overflow-hidden border border-gray-400/20 shadow-lg"
                                 :class=" quizNow.id !== quiz.id && start ?'opacity-70':'' ">
                                <div
                                    class="w-8 h-8 bg-gray-700 text-white flex justify-center items-center rounded-full">
                                    <i class="fa fa-trophy "></i>
                                </div>
                                <div class="pr-2 font-bold flex gap-2 items-center ">
                                    <p>{{ quiz.name }}</p>
                                    <div class="text-gray-500 text-xs">
                                        <i class="fa-duotone  fa-clock-rotate-left"></i>
                                        {{ getDuration(quiz.duration) }}

                                    </div>
                                </div>
                                <div v-if="quizNow.id === quiz.id && start"
                                     class="bg-orange-500/50 absolute top-0 bottom-0 left-0 w-full "
                                     :style="'width:'+countDown+'%' "></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!start && !end && inTime()"
                     class="flex-col flex gap-2  w-full border border-gray-200 bg-slate-100 p-6 rounded-xl">
                    <div class="flex flex-wrap gap-4 items-center">
                        <p class="text-xl font-thin">Participer:</p>
                    </div>
                    <div>
                        <div class="flex-col flex gap-4">
                            <div class="flex flex-col gap-4">
                                <input type="email" name="email" id="email" v-model="email" placeholder="Adresse E-mail"
                                       class="form_input rounded-full font-thin text-2xl" required>
                                <input-error :error="err.email"></input-error>
                            </div>
                            <div class="flex justify-end">
                                <button @click="init"
                                        class="_btn rounded-full py-3 font-black text-lg hover:text-orange-500
                                bg-gradient-to-r from-green-400 to-blue-400 hover:to-cyan-300 hover:from-emerald-300 ">
                                    Commencer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <transition
                    enter-active-class="duration-500 ease-out"
                    enter-from-class="transform -translate-x-10 opacity-0"
                    enter-to-class="opacity-100 translate-x-0"
                    leave-active-class="duration-300 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="delay-400 transform opacity-0 -translate-y-8 ">
                    <div v-if="start && questions[questionCount] && inTime()"
                         class="flex-col flex gap-2   w-full border border-gray-200 bg-slate-100 p-6 rounded-xl">
                        <div class="flex flex-wrap gap-4 items-center">
                            <p class="text-xl font-thin">Question:</p>
                            <div class="text-lg py-1 px-2 pr-3 rounded-full bg-blue-500 flex items-center justify-center
                                font-black text-white gap-2">
                                <i class="fa fa-seal-question"></i>
                                <p class=""> {{ questionCount + 1 }}</p>
                                &bull;
                                <p class="opacity-50">{{ Object.keys(questions).length }}</p>

                            </div>
                        </div>
                        <div>
                            <div class="flex-col flex gap-4">
                                <div class="text-center text-xl">
                                    <h1>{{ questions[questionCount].content }}</h1>
                                </div>
                                <div class="flex-col flex gap-4" v-for="item in  shuffleAnswers()">
                                    <label :for="'question_'+questions[questionCount].id"
                                           class="bg-blue-200 text-blue-800 hover:bg-blue-500 font-black hover:text-blue-50 p-4 rounded-lg text-xl   "
                                           @click="answer(item)">
                                        {{ item }}
                                    </label>
                                    <input type="radio" :name="'questions_quiz_'+questions[questionCount].quiz_id"
                                           :id="'question_'+questions[questionCount].id" class="hidden">
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition
                    enter-active-class="duration-500 ease-out"
                    enter-from-class="transform -translate-x-10 opacity-0"
                    enter-to-class="opacity-100 translate-x-0"
                    leave-active-class="duration-300 ease-in"
                    leave-from-class="opacity-100 translate-x-0"
                    leave-to-class="delay-400 transform opacity-0 translate-x-8 ">
                    <div v-if="end"
                         class="flex-col flex gap-2 w-full border border-gray-200 bg-slate-100 p-6 rounded-xl">
                        <div class="flex flex-wrap gap-4 items-center">
                            <p class="text-xl font-thin">Resulta:</p>
                        </div>
                        <hr>
                        <div>
                            <div class="flex-col flex gap-4">
                                <div class="font-bold text-xl text-center">
                                    <p>Merci pour votre participation</p>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="flex justify-center items-center">
                                        <div
                                            class="p-2 bg-emerald-200 text-2xl text-green-700 font-black _btn w-fit flex gap-2 px-4 rounded-full">
                                            <i class="fa fa-check-circle w-8 h-8 flex justify-center items-center"></i>{{
                                                review.correct
                                            }}
                                        </div>
                                    </div>
                                    <div class="flex justify-center items-center">
                                        <div
                                            class="p-2 bg-rose-200 text-2xl text-red-700 font-black _btn w-fit flex gap-2 px-4 rounded-full">
                                            <i class="fa fa-check-circle w-8 h-8 flex justify-center items-center"></i>{{
                                                review.incorrect
                                            }}
                                        </div>
                                    </div>
                                    <div class="col-span-full flex justify-center items-center">
                                        <div
                                            class="p-3 bg-cyan-200 text-5xl text-blue-700 font-black _btn w-fit flex gap-2 px-4 items-center ">
                                            {{ Math.round(review.percent  * 100) / 100}}<i
                                            class="fa-duotone fa-percent w-8 h-8 flex justify-center items-center"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <div class="flex flex-wrap gap-4 py-6 flex-1" v-if="!inTime()">
                    <div class=" flex justify-center flex-col gap-6 flex-1">
                        <div class="_btn _btn-default text-xl text-center dark:bg-gray-900">
                            {{ time_format(competition.period.from, false, 'fr', 'dddd DD MMM YY') }}
                        </div>
                        <div class="text-center text-5xl">
                            {{ time_format(competition.period.from, false, 'fr', 'HH:mm') }}
                        </div>
                    </div>
                    <div class=" flex justify-center flex-col gap-6 flex-1">
                        <div class="_btn _btn-default text-xl text-center  dark:bg-gray-900">
                            {{ time_format(competition.period.to, false, 'fr', 'dddd DD MMM YY') }}
                        </div>
                        <div class="text-center text-5xl">
                            {{ time_format(competition.period.to, false, 'fr', 'HH:mm') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import routes from "@/routes/index.js";
import use_competition from "@/CRUD/competition.js";
import axios from "@/axios/index.js";
import {initialsToName, time_format, toggleTheme} from "@/functions/helpers.js";
import {ref} from "vue";
import moment from "moment";

export default {
    name: "index",
    methods: {
        time_format,
        initialsToName,
        inTime() {
            //console.log(moment().isBetween(this.competition.period.from, this.competition.period.to))
            return moment().isBetween(this.competition.period.from, this.competition.period.to)
        },
        shuffle(array) {
            let currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex > 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        },
        shuffleAnswers() {
            let q = this.questions[this.questionCount],
                arr = [...q.correct_answer, ...q.incorrect_answers]
            return this.shuffle(arr)
        },
        answer(item) {
            let q = this.questions[this.questionCount]
            let el = $(event.target)
            if (!this.answers.incorrect[q.id] && !this.answers.correct[q.id]) {
                el.removeClass('bg-blue-200 text-blue-800 hover:bg-blue-500')
                if (q.correct_answer.includes(item)) {
                    el.addClass('bg-green-500 text-green-50')
                    delete this.answers.incorrect[q.id]
                    this.answers.correct[q.id] = q.id
                } else {
                    el.addClass('bg-red-600 text-red-50')
                    delete this.answers.correct[q.id]
                    this.answers.incorrect[q.id] = q.id
                }
            }

            let state = this.questionCount

            if (!this.questions[this.questionCount + 1]) return this.endCompetition()

            this.questionCount = null
            setTimeout(() => {
                this.questionCount = state + 1
                this.competition.quizzes.map((res) => {
                    let newQuestion = this.questions[this.questionCount]
                    if (res.id === newQuestion.quiz_id) {
                        this.quizNow = res
                    }
                })
            }, 500)
        },
        getDuration(time) {
            time = time * 60 * 1000
            let d = moment.duration(time)
            // console.log(moment.duration(time), time)

            return d.get('hours') + ':' + d.get('minutes') + ':' + d.get('seconds')
        },
        quizCountDownDuration() {
            let duration = this.quizNow.duration * 60 * 1000
            let du = this.quizNow.duration * 60 * 1000
            this.countDown = 100

            if (this.interval) {
                window.clearInterval(this.interval)
            }

            this.interval = setInterval(() => {
                let d = (duration * 100) / du
                duration = duration - 500
                if (duration - 500 < 0) {
                    this.endCompetition()
                }
                this.countDown = Math.round(d * 100) / 100
            }, 500)
        },
        init() {
            if (!this.email) return
            this.if_student_exist({
                'email': this.email
            }).then((res) => {
                this.start = true
                this.quizCountDownDuration()
            }).catch((e) => {
                this.err = e.response.data.errors
            })
        },
        endCompetition() {
            window.clearInterval(this.interval)
            this.start = false
            this.end = true
            this.review = {
                correct: Object.keys(this.answers.correct).length,
                incorrect: Object.keys(this.answers.incorrect).length,
                percent: (Object.keys(this.answers.correct).length * 100) / Object.keys(this.questions).length,
                percent_inc: (Object.keys(this.answers.incorrect).length * 100) / Object.keys(this.questions).length,
            }
            this.store_answer({
                email: this.email,
                competition_id: this.competition.id,
                correct: Object.keys(this.answers.correct).length,
                incorrect: Object.keys(this.answers.incorrect).length,
                percent_corr: (Object.keys(this.answers.correct).length * 100) / Object.keys(this.questions).length,
                percent_inc: (Object.keys(this.answers.incorrect).length * 100) / Object.keys(this.questions).length,
            })

            return true
        }

    },
    mounted() {

    },
    watch: {
        'quizNow.id': function (newPrice, oldPrice) {
            this.quizCountDownDuration()
        }
    },
    data() {
        const {get_competition, store_answer, if_student_exist} = use_competition()
        const competition = this.$route.meta.data ?? false
        const answers = ref({correct: {}, incorrect: {}})
        const questionCount = ref(0)
        const questions = this.$route.meta.data.allQuestions
        const quizNow = this.$route.meta.data.quizzes[0]
        const countDown = ref(0)
        const interval = ref(false)
        const email = ref('')
        const review = ref(false)
        const end = ref(false)
        const start = ref(false)
        return {
            start,
            end,
            review,
            email,
            err: {},
            answers,
            interval,
            countDown,
            quizNow,
            questions,
            questionCount,
            competition,
            toggleTheme,
            if_student_exist,
            store_answer,
            get_competition,
        }
    },

}
</script>
