# Vital Events Notifier (pilot)

Turns health facility birth and death registers and informal community reports into checked notifications for civil registration, and tracks which events are still unregistered.

- **Who uses it:** facility records staff (notifiers), community informants (traditional birth attendants, ward focal persons, religious leaders) and civil registration registrars.
- **Pilot:** National Population Commission (NPC), Ife Central LGA, Osun State, Nigeria. Designed to be configured for other African countries (country settings in the page).
- **What it does:** AI reading of register photos; AI reading of informal reports in any language (with English translation); rule checks for impossible dates and ages, missing details, duplicates and twins; links neonatal deaths to births; AI matching with the registrar's list to find events notified but not registered; AI-drafted reminders to families in local languages; CSV export.
- **It feeds, and does not replace,** the national civil registration system (in Nigeria, the NPC e-CRVS).
- **Privacy:** personal details are visible only to the notifying facility, the informant who reported, the LGA registrar and the administrator; erased 90 days after registration, closure or duplicate; photos are not stored. Test data only until approval and a data-sharing agreement.
- **Built with:** a single HTML page hosted on Netlify, with a Supabase database and an Edge Function that calls the Anthropic Claude API. No secret keys are kept in this repository.

Institute of Public Health, Obafemi Awolowo University, Ile-Ife.
Principal investigator: Akingbola Sunday Omokanye.
