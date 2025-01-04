export function formatDate(isoDateString: string): string {
  const now = new Date();
  const targetDate = new Date(isoDateString);


  const diff = now.getTime() - targetDate.getTime(); // Difference in milliseconds
  const diffHours = diff / (1000 * 60 * 60);
  const diffDays = diff / (1000 * 60 * 60 * 24);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (diffHours < 24) {
    return targetDate.toLocaleTimeString("en-US", options); // Example: "7:57 AM" or "10:54 PM"
  } else if (diffHours < 48) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return targetDate.toLocaleDateString("en-US", { weekday: "short" }); // Example: "Sat", "Fri"
  } else if (now.getFullYear() === targetDate.getFullYear()) {
    return targetDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }); // Example: "Dec 9", "Oct 17"
  } else {
    return targetDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }); // Example: "Dec 28, 2023"
  }
}

