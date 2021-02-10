import { Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paperBlock: {
    [theme.breakpoints.down('xs')]: { width: '85%' },
    [theme.breakpoints.up('sm')]: { width: '400px' },
    textAlign: 'center',
    marginTop: '30px',
    padding: '20px 10px',
  },
}))

const About = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paperBlock}>
        <h3>שלום וברוכים הבאים לShopList</h3>
        <p>
          מטרת האפליקציה היא יצירת רשימת קניות משותפת עם החברים\השותפים שלכם
          ושיתוף נוח בעזרת חדר משותף רק שלכם.
        </p>
        <p>
          כדי להתחיל שימוש באפליקציה יש ליצור חדר חדש בעמוד ההרשמה. שתפו את פרטי
          החדר עם האנשים שתרצו להיות אתכם באפליקציה.
        </p>
        <p>
          <strong>מגבלות ופונקציונליות: </strong>
        </p>
        <p> 1.רשמית המועדפים יכולה להכיל עד 10 פריטים</p>
        <p>2.רשימת הקניות יכולה להכיל עד 30 פריטים</p>
        <p>3.ניתן תמיד לשנות את פרטי החדר</p>
        <p>
          כדי לראות פונקציות סימון\מחיקה מתקדמות יש ללחוץ על כפתור ה"אפשרויות
          נוספות" בעמוד הרשימה שלי.
        </p>
        <p style={{ color: 'GrayText', padding: '20px 0' }}>
          האפליקציה נבנתה על ידי מיכאל דונצ'נקו וכל הזכויות שמורות
        </p>
      </Paper>
    </div>
  )
}

export default About
