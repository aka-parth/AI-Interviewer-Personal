def generate_question_prompt(
    role: str,
    difficulty: str
):

    return f"""
    You are an expert technical interviewer.

    Generate ONE {difficulty} interview question
    for a {role} candidate.

    Only return the interview question.
    """