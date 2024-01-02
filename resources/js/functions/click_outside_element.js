/**
 *
 * service client :
 *
  Organisation des commandes à confirmer sur vos agents  =>
 *
 * Détection automatique des clients non sérieux et clients fidèles
 *
 * Détection automatique des doubles commandes
 *
  Traçabilité sur l'historique => show_order_history
 *
 * Envoi automatique d'sms Préparation
 *
 * Exportation d'un excel des commandes confirmés pret à
 * etre uploader sur les platformes de livraisons.   => export_orders_depending_on_shipper
 *
 * Impression des étiquettes (bordereaux)
 *
 * Personnalisation de votre étiquette
 *
 * Choix de vos livreurs ou sociétés de livraison   => create_shipper
 *
 * Impression des feuilles de route
 *
 * Génération automatique de tracking
 *
 * Code à barre etiquette pour douchette
 * Suivi :
 *
 * notifier appropos des commandes en retard ( suspendu )
 *
 * Impression de la décharge des retours et des colis livrés
 *
 * System de changement des états des commandes en masse multi-platformes  => change_order_status
 * Lotfi
 * Stock :
 *
 ** Gestion de vos produits =>
 *
 * Gestion de stock en temps réel => article_stock_realTime
 *
 * Alerte en cas de rupture de stock  => article_outOfStock
 * ou l'atteint d'un seuil => article_close_outOfStock
 *
 * Stats :
 *
 * Statistiques de vos commandes => orders_analyse
 *
 * Statisiques financières => finance_analyse
 *
 * Statistiques de vos livraisons par Wilayas et communes => map_analyse
 *
 *
 */
 import {onMounted,onBeforeMount, ref} from "vue";
export default (el_target_ref, call)=>{

        if(!el_target_ref)return;

        let listener = (e)=>{
            if(e.target == el_target_ref.value || e.composedPath().includes(el_target_ref.value)){
                return;
            }

            if(typeof call == 'function'){
                call()
            }
        }


        onMounted(() => {
            window.addEventListener('click', listener)
        })
        onBeforeMount(() => {
            window.addEventListener('click', listener)
        })
        return{
            listener
        }

}
