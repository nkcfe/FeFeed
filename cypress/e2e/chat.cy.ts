describe('챗봇 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/chatbot');
  });

  it('챗봇 페이지 로드', () => {
    cy.contains('어떻게 도와드릴까요?');
    cy.get('input').type('안녕하세요');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="message"]').should('have.length', 2 );
  });

  it('챗봇 대화 초기화', () => {
    cy.get('input').type('안녕하세요');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="message"]').should('have.length', 2 );
    cy.get('button[type="reset"]').click();
    cy.get('[data-cy="message"]').should('have.length', 0);
  })
});
