import {array_has_keys} from '@/functions/helpers'
import defineAbilities from "@/functions/pluings/Castle/defineAbilities";

// Plugin code goes here
// install plug in
export default {
    install: async (app, options) => {
        /**
         * fetch all logged in employee permissions
         */
        let abilities = await defineAbilities().then(r => r)

        /**
         * can property check if ability is in employee abilities
         * @param ability
         * @param strict
         * @returns {boolean}
         */
        app.config.globalProperties.$can = (ability, strict = false) => {
            ability = typeof ability === "string" ? ability.split('|') : ability;
            ability = ability.filter((f) => f)
            return ability.length > 0 ? array_has_keys(abilities, ability, strict) : true
        }

        /**
         *  canNot property is inverse of can property
         * @param ability
         * @param strict
         * @returns {boolean}
         */
        app.config.globalProperties.$canNot = (ability, strict = false) => {
            return app.config.globalProperties.$can(ability, strict) !== true
        }

    }
}
