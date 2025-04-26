export function formatDate(dateString: string | undefined): string {
    
    // If dateString is undefined or null, return today's date in the desired format
    const today = new Date();
    
    const date = (!dateString)? today :new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  