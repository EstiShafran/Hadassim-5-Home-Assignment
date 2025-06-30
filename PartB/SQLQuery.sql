--create table People(
--	Person_Id Nvarchar(9) primary key,
--	Personal_Name Nvarchar(25),
--	Family_Name Nvarchar(25),
--	Gender Nvarchar(10) check(Gender in ('male','female')),
--	Father_Id VARCHAR(9),
--	Mother_Id VARCHAR(9),
--	Spouse_Id VARCHAR(9)
--)


INSERT INTO People (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES
-- Parents
('100000001', 'Avner', 'Cohen', 'male', NULL, NULL, '100000002'),
('100000002', 'Ruth', 'Cohen', 'female', NULL, NULL, '100000001'),

-- Children
('100000003', 'Daniel', 'Cohen', 'male', '100000001', '100000002', '100000009'),
('100000004', 'Noa', 'Cohen', 'female', '100000001', '100000002', NULL),
('100000005', 'Shira', 'Cohen', 'female', '100000001', '100000002', NULL),

-- Daniel's wife (not from family)
('100000009', 'Lea', 'Mizrahi', 'female', NULL, NULL, '100000003'),

-- Child of Daniel and Lea
('100000006', 'Yoav', 'Cohen', 'male', '100000003', '100000009', NULL),

-- Another unrelated couple (one-sided)
('100000007', 'Ori', 'Levi', 'male', NULL, NULL, '100000008'),
('100000008', 'Maayan', 'Levi', 'female', NULL, NULL, NULL);


--CREATE TABLE Relatives (
--    Person_Id VARCHAR(9),
--    Relative_Id VARCHAR(9),
--    Connection_Type VARCHAR(20),
--    PRIMARY KEY (Person_Id, Relative_Id, Connection_Type)
--);


-- הוספת קשר ילד → אב
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Father_Id, 'אב'
FROM People
WHERE Father_Id IS NOT NULL;


-- הוספת קשר ילד → אם
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Mother_Id, 'אם'
FROM People
WHERE Mother_Id is not NULL;


-- הוספת קשר אב → בן/בת
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT Father_Id, Person_Id,
       CASE p.Gender
            WHEN 'male' THEN 'בן'
            WHEN 'female' THEN 'בת'
       END
FROM People p
WHERE Father_Id IS NOT NULL;


-- הוספת קשר אם → בן/בת
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT Mother_Id, Person_Id,
	CASE p.Gender
		when 'male' THEN 'בן'
		WHEN 'female' THEN 'בת'
	END
FROM People p
WHERE Mother_Id is not NULL;


-- הוספת קשר אדם → אח/אחות
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT DISTINCT
    p1.Person_Id,
    p2.Person_Id,
    CASE p2.Gender
        WHEN 'male' THEN 'אח'
        WHEN 'female' THEN 'אחות'
    END
FROM People p1
JOIN People p2
    ON (
		(p1.Father_Id IS NOT NULL AND p1.Father_Id = p2.Father_Id)
        OR
        (p1.Mother_Id IS NOT NULL AND p1.Mother_Id = p2.Mother_Id)
	)
WHERE p1.Person_Id <> p2.Person_Id;


-- הוספת קשר אדם → בן זוג/בת זוג
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Spouse_Id, 
	CASE p.Gender
		WHEN 'male' THEN 'בת זוג'
		WHEN 'female' THEN 'בן זוג'
	END
FROM People p
WHERE Spouse_Id IS NOT NULL;


-- ההשלמה של בן זוג/בת זוג
INSERT INTO Relatives (Person_Id, Relative_Id, Connection_Type)
SELECT r.Relative_Id AS Person_Id,
       r.Person_Id AS Relative_Id,
       CASE r.Connection_Type
           WHEN 'בת זוג' THEN 'בן זוג'
           WHEN 'בן זוג' THEN 'בת זוג'
       END AS Connection_Type
FROM Relatives r
WHERE r.Connection_Type IN ('בן זוג', 'בת זוג')
  AND NOT EXISTS (
      SELECT 1
      FROM Relatives r2
      WHERE r2.Person_Id = r.Relative_Id
        AND r2.Relative_Id = r.Person_Id
        AND r2.Connection_Type IN ('בן זוג', 'בת זוג')
  );


select * from People
select * from Relatives
