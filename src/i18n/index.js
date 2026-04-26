import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    login: 'Login',
    signup: 'Sign Up',
    joinMess: 'Join a Mess',
    createMess: 'Create a New Mess',
    dashboard: 'Dashboard',
    language: 'Language',
    english: 'English',
    bangla: 'বাংলা',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    noAccount: 'No account?',
    haveAccount: 'Have an account?',
    welcome: 'Welcome',
    welcomeDashboard: 'Welcome to your Dashboard'
  },
  bn: {
    login: 'লগইন',
    signup: 'সাইন আপ',
    joinMess: 'একটি মেসে যোগ দিন',
    createMess: 'নতুন মেস তৈরি করুন',
    dashboard: 'ড্যাশবোর্ড',
    language: 'ভাষা',
    english: 'English',
    bangla: 'বাংলা',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    name: 'নাম',
    noAccount: 'অ্যাকাউন্ট নেই?',
    haveAccount: 'অ্যাকাউন্ট আছে?',
    welcome: 'স্বাগতম',
    welcomeDashboard: 'আপনার ড্যাশবোর্ডে স্বাগতম'
  }
}

const i18n = createI18n({
  locale: 'en', // default
  fallbackLocale: 'en',
  messages
})

export default i18n