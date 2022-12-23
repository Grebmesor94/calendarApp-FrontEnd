import { memo } from "react";


export const CalendarEvent = memo(({ event }) => {

  const { title, user } = event; 

  return (
    <div>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </div>
  )
})
