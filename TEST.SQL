
                SELECT R.RID, R.value, R.note, R.date_time, R.bil_img, R.TID, TOM.name FROM record R
                JOIN topic_of_money TOM ON R.TID = TOM.Topic_ID
                where R.User_id = 8;


                SELECT Topic_ID, name, priority  FROM topic_of_money 
                WHERE in_or_out = 1 AND User_id = 8 ;
                

                INSERT INTO `record` (`RID`, `value`, `note`, `date_time`, `bil_img`, `TID`, `User_id`) 
                VALUES (NULL, '20', 'hello', '2021-08-18 08:57:46.000000', 'no', '11', '8');