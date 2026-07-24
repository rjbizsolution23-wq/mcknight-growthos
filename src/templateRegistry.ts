// ── Funnel template registry — single import point for rendering ──
import { eventLandingTemplate } from './templates/eventLanding'
import { sponsorDeckTemplate } from './templates/sponsorDeck'
import { taxLeadTemplate } from './templates/taxLead'
import { creditServiceTemplate } from './templates/creditService'
import { creditSaasTemplate } from './templates/creditSaas'
import { realEstateTemplate } from './templates/realEstate'
import { fitnessTemplate } from './templates/fitness'
import { coachingTemplate } from './templates/coaching'
import { ecommerceTemplate } from './templates/ecommerce'
import { saasTrialTemplate } from './templates/saasTrial'
import { lawFirmTemplate } from './templates/lawFirm'
import { homeServicesTemplate } from './templates/homeServices'
import { medSpaTemplate } from './templates/medSpa'
import { insuranceTemplate } from './templates/insurance'
import { agencyTemplate } from './templates/agency'
import { restaurantTemplate } from './templates/restaurant'
import { dentalTemplate } from './templates/dental'
import { autoServicesTemplate } from './templates/autoServices'
import { salonTemplate } from './templates/salon'
import { mortgageTemplate } from './templates/mortgage'
import { chiropracticTemplate } from './templates/chiropractic'
import { petCareTemplate } from './templates/petCare'
import { landscapingTemplate } from './templates/landscaping'
import { cleaningTemplate } from './templates/cleaning'
import { childcareTemplate } from './templates/childcare'
import { tutoringTemplate } from './templates/tutoring'
import { accountingTemplate } from './templates/accounting'
import { photographyTemplate } from './templates/photography'
import { weddingVenueTemplate } from './templates/weddingVenue'
import { movingTemplate } from './templates/moving'
import { webinarLiveTemplate } from './templates/webinarLive'
import { vslTemplate } from './templates/vsl'
import {
  opportunityGroupSite, contractingPreacherSite, housingInitiativeSite, capitalReadySite,
  mortgageosSite, growthCommandSite, freightSystemsSite, fleetworksSite,
  earlyLearningSite, learningosSite,
} from './templates/brandSiteConfigs'

export const TEMPLATES: Record<string, (q: Record<string, string | undefined>) => string> = {
  'event-landing': eventLandingTemplate, 'sponsor-deck': sponsorDeckTemplate, 'tax-lead': taxLeadTemplate,
  'credit-service': creditServiceTemplate, 'credit-saas': creditSaasTemplate,
  'real-estate': realEstateTemplate, 'fitness': fitnessTemplate, 'coaching': coachingTemplate,
  'ecommerce': ecommerceTemplate, 'saas-trial': saasTrialTemplate, 'law-firm': lawFirmTemplate,
  'home-services': homeServicesTemplate, 'med-spa': medSpaTemplate, 'insurance': insuranceTemplate,
  'agency': agencyTemplate, 'restaurant': restaurantTemplate, 'dental': dentalTemplate,
  'auto-services': autoServicesTemplate, 'salon': salonTemplate, 'mortgage': mortgageTemplate,
  'chiropractic': chiropracticTemplate, 'pet-care': petCareTemplate, 'landscaping': landscapingTemplate,
  'cleaning': cleaningTemplate, 'childcare': childcareTemplate, 'tutoring': tutoringTemplate,
  'accounting': accountingTemplate, 'photography': photographyTemplate,
  'wedding-venue': weddingVenueTemplate, 'moving': movingTemplate,
  'webinar-live': webinarLiveTemplate, 'vsl': vslTemplate,
  // v6.0 brand flagship sites — McKnight Opportunity Group full fleet
  'opportunity-group': opportunityGroupSite, 'contracting-preacher': contractingPreacherSite,
  'housing-initiative': housingInitiativeSite, 'capital-ready': capitalReadySite,
  'mortgageos': mortgageosSite, 'growth-command': growthCommandSite,
  'freight-systems': freightSystemsSite, 'fleetworks': fleetworksSite,
  'early-learning': earlyLearningSite, 'learningos': learningosSite,
}
