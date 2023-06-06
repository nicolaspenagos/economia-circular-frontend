export function handleIfShowOnboarding(currentUserOnboardingPath) {
  if (!localStorage.getItem(currentUserOnboardingPath)) {
    localStorage.setItem(currentUserOnboardingPath, "true");
    return true;
  }
  return false;
}
