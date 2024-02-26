describe('홈페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('챗봇 페이지 이동', () => {
    cy.contains('챗봇').click();
    cy.url().should('include', '/chatbot');
  });

  it('글 목록', () => {
    cy.get('[data-cy="post-card"]').first().click();
    cy.url().should('include', '/posts/');
  });

  it('카테고리 선택', () => {
    cy.get('[data-cy="category"]').first().click();
    cy.get('[data-cy="post-card"]').should('have.length.at.least', 1);
  });
});
