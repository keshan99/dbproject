
                SELECT R.RID, R.value, R.note, R.date_time, R.bil_img, R.TID, TOM.name FROM record R
                JOIN topic_of_money TOM ON R.TID = TOM.Topic_ID
                where R.User_id = 8;