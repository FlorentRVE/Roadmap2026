// app/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  hint?: string;
};

type Phase = {
  id: string;
  badge: string;
  title: string;
  timeframe: string;
  goal: string;
  toMaster: string[];
  exercises: ChecklistItem[];
  deliverables: ChecklistItem[];
  outcome: string;
};

const PHASES: Phase[] = [
  {
    id: "p0",
    badge: "Phase 0",
    title: "Mise en place",
    timeframe: "Jour 1–3",
    goal: "Mettre en place ton lab, ton organisation et ton portfolio pour produire des preuves chaque semaine.",
    toMaster: [
      "Organisation GitHub (repos, README)",
      "Docs en Markdown",
      "VMs + réseau virtuel (NAT + Host-only)",
    ],
    exercises: [
      { id: "p0-e1", label: "Installer VirtualBox ou VMware Player" },
      {
        id: "p0-e2",
        label: "Créer 3 VMs : Windows Server, Windows client, Ubuntu Server",
      },
      {
        id: "p0-e3",
        label: "Configurer 2 réseaux : NAT + Host-only (LAN simulé)",
        hint: "Garde une config stable, évite de trop varier.",
      },
    ],
    deliverables: [
      { id: "p0-d1", label: "Repo GitHub : it-lab-docs" },
      { id: "p0-d2", label: "Repo GitHub : powershell-automation" },
      { id: "p0-d3", label: "Repo GitHub : cloud-devops-labs" },
      {
        id: "p0-d4",
        label: "Repo GitHub : capstone-platform (vide pour l’instant)",
      },
      { id: "p0-d5", label: "Page portfolio : it-lab-docs/portfolio-index.md" },
    ],
    outcome:
      "Tu es prêt à apprendre vite et à prouver tout ce que tu fais (indispensable pour le remote).",
  },
  {
    id: "p1",
    badge: "Phase 1",
    title: "Rebuild Réseau + Support-ready",
    timeframe: "Semaine 1–2",
    goal: "Revoir les bases réseau et devenir crédible pour un poste technicien réseau / support N1-N2.",
    toMaster: [
      "IPv4 + subnetting (essentiel)",
      "DNS/DHCP (fonctionnement + pannes classiques)",
      "VLAN (concept), NAT, VPN (bases)",
      "Outils : ping, tracert, nslookup, ipconfig/ifconfig, netstat/ss",
      "Méthode diagnostic + tickets propres",
    ],
    exercises: [
      {
        id: "p1-e1",
        label:
          "Simuler 10 pannes réseau et les résoudre (DNS, DHCP, gateway, conflit IP…)",
      },
      {
        id: "p1-e2",
        label:
          "Rédiger 15 tickets réalistes (contexte → impact → diag → actions → résultat)",
      },
    ],
    deliverables: [
      { id: "p1-d1", label: "it-lab-docs/network-troubleshooting-playbook.md" },
      { id: "p1-d2", label: "it-lab-docs/tickets-samples.md" },
    ],
    outcome:
      "Tu retrouves un socle réseau solide + une méthode de support pro.",
  },
  {
    id: "p2",
    badge: "Phase 2",
    title: "Windows/AD (socle Sysadmin junior)",
    timeframe: "Semaine 3–4",
    goal: "Construire un socle sysadmin junior : AD, GPO, partages/droits, sécurité de base.",
    toMaster: [
      "AD DS : OU, users, groupes",
      "Jonction domaine",
      "GPO utiles (simples)",
      "Partages + NTFS (crucial)",
      "Sécurité : MFA, patching, moindre privilège",
    ],
    exercises: [
      {
        id: "p2-e1",
        label:
          "Créer un domaine lab.local + OU Users/Computers + 10 users + 3 groupes",
      },
      {
        id: "p2-e2",
        label:
          "Créer 2 GPO utiles (mot de passe/verrouillage + mappage lecteur ou règle poste)",
      },
      {
        id: "p2-e3",
        label:
          "Mettre en place 3 partages (RH/Compta/Commun) + droits propres + 1 cas “accès refusé”",
      },
    ],
    deliverables: [
      {
        id: "p2-d1",
        label: "it-lab-docs/ad-lab-setup.md (captures + mini schéma)",
      },
      { id: "p2-d2", label: "it-lab-docs/fileshares-permissions.md" },
    ],
    outcome: "Tu es au niveau technicien sys/réseau junior sur Windows/AD.",
  },
  {
    id: "p3",
    badge: "Phase 3",
    title: "Employabilité ≤ 3 mois (job rapide)",
    timeframe: "Semaine 5–8",
    goal: "Décrocher un poste technicien réseau / sysadmin junior tout en préparant le pivot cloud.",
    toMaster: [
      "M365/Entra notions (MFA, RBAC)",
      "Supervision/logs (bases)",
      "Sauvegarde/restauration (concept + mini pratique)",
      "Documentation runbook",
    ],
    exercises: [
      {
        id: "p3-e1",
        label: "Créer un runbook support (MFA, reset, panne DNS/DHCP, VPN…)",
      },
      {
        id: "p3-e2",
        label:
          "Mettre une supervision simple (CPU/RAM/Disk + service) et documenter quoi surveiller",
      },
      {
        id: "p3-e3",
        label:
          "Routine candidatures : 15–25/sem + 2 relances/jour + 1 post LinkedIn/sem",
      },
    ],
    deliverables: [
      { id: "p3-d1", label: "it-lab-docs/support-runbook.md" },
      { id: "p3-d2", label: "it-lab-docs/monitoring-basics.md" },
      {
        id: "p3-d3",
        label: "CV cible A (Support/sys) + CV cible B (Sys/réseau) en PDF",
      },
    ],
    outcome: "Tu maximises tes chances d’embauche rapide (≤ 3 mois).",
  },
  {
    id: "p4",
    badge: "Phase 4",
    title: "Automatisation + Linux foundations",
    timeframe: "Semaine 9–12",
    goal: "Te différencier : sys/réseau + automatisation (très valorisé) et préparer le cloud.",
    toMaster: [
      "PowerShell : CSV, fonctions, scripts réutilisables",
      "Linux : SSH, permissions, systemd, logs (journalctl), réseau (ip/ss/dig)",
    ],
    exercises: [
      {
        id: "p4-e1",
        label: "Script PowerShell inventaire → CSV (poste/machine)",
      },
      { id: "p4-e2", label: "Script création users depuis CSV (AD lab)" },
      {
        id: "p4-e3",
        label: "Script “disable leaver” (process départ employé)",
      },
      {
        id: "p4-e4",
        label: "Rédiger un Linux runbook (commandes + dépannage)",
      },
    ],
    deliverables: [
      {
        id: "p4-d1",
        label: "Repo : powershell-automation (README + exemples d’output)",
      },
      { id: "p4-d2", label: "cloud-devops-labs/linux-runbook.md" },
    ],
    outcome:
      "Tu deviens un profil “sys moderne” et tu te rapproches du cloud junior.",
  },
  {
    id: "p5",
    badge: "Phase 5",
    title: "Pivot Cloud (Azure-first + AWS bridge)",
    timeframe: "Semaine 13–18",
    goal: "Devenir Cloud junior (sysadmin cloud) : réseau, identité, VM, sécurité, coûts.",
    toMaster: [
      "Azure : VNet, subnets, NSG",
      "Azure : VM, images, scaling notions",
      "Entra ID : RBAC, MFA (concept + bonnes pratiques)",
      "Monitoring/logs (bases) + coûts (hygiène cloud)",
      "AWS bridge : IAM, EC2, VPC (concept), Security Groups, S3",
    ],
    exercises: [
      {
        id: "p5-e1",
        label:
          "Lab Azure : VNet + subnet + NSG + VM (accès sécurisé) + doc coût estimé",
      },
      {
        id: "p5-e2",
        label: "Doc identité/sécurité : RBAC, MFA, erreurs courantes (cloud)",
      },
      {
        id: "p5-e3",
        label:
          "AWS mini bridge : comprendre équivalences Azure ↔ AWS (tableau + mini lab)",
      },
    ],
    deliverables: [
      {
        id: "p5-d1",
        label: "cloud-devops-labs/azure-vnet-vm-lab.md (schéma + étapes)",
      },
      { id: "p5-d2", label: "cloud-devops-labs/azure-identity-security.md" },
      {
        id: "p5-d3",
        label: "cloud-devops-labs/aws-bridge.md (tableau équivalences)",
      },
    ],
    outcome:
      "Tu peux candidater Cloud admin/engineer junior, et tu es sur une trajectoire remote-friendly.",
  },
  {
    id: "p6",
    badge: "Phase 6",
    title: "Transition DevOps",
    timeframe: "Semaine 19–24",
    goal: "Passer de cloud → DevOps : livrer + opérer + automatiser (CI/CD, IaC, K8s, observabilité).",
    toMaster: [
      "Docker/compose propre",
      "CI/CD (GitHub Actions)",
      "IaC (Terraform/Bicep) – obligatoire pour remote",
      "Kubernetes bases (k3d/kind)",
      "Observabilité : metrics/logs/alerting",
      "Runbooks + incident drill + postmortem",
    ],
    exercises: [
      {
        id: "p6-e1",
        label:
          "Mettre un pipeline CI/CD : build image Docker + test/lint + déploiement",
      },
      {
        id: "p6-e2",
        label: "K8s : déployer une app sur k3d/kind + debug (logs/describe)",
      },
      {
        id: "p6-e3",
        label:
          "Capstone : infra en IaC + app docker/k8s + CI/CD + monitoring + runbooks",
      },
    ],
    deliverables: [
      {
        id: "p6-d1",
        label: "cloud-devops-labs/cicd-github-actions.md + pipeline actif",
      },
      { id: "p6-d2", label: "cloud-devops-labs/k8s-basics/README.md" },
      {
        id: "p6-d3",
        label:
          "Repo : capstone-platform (README + archi + runbooks + postmortem)",
      },
    ],
    outcome:
      "Tu es crédible pour des rôles DevOps junior (ou cloud/ops/devops), avec un portfolio remote prêt.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-zinc-800/80 overflow-hidden">
      <div
        className="h-full bg-emerald-500 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
      {children}
    </span>
  );
}

export default function Page() {
  const storageKey = "roadmap_progress_v1";
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked]);

  const allItems = useMemo(() => {
    const items: ChecklistItem[] = [];
    PHASES.forEach((p) => {
      items.push(...p.exercises, ...p.deliverables);
    });
    return items;
  }, []);

  const total = allItems.length;
  const done = allItems.reduce((acc, it) => acc + (checked[it.id] ? 1 : 0), 0);
  const overall = total ? Math.round((done / total) * 100) : 0;

  const phaseProgress = (phase: Phase) => {
    const items = [...phase.exercises, ...phase.deliverables];
    const t = items.length;
    const d = items.reduce((acc, it) => acc + (checked[it.id] ? 1 : 0), 0);
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const reset = () => {
    if (confirm("Réinitialiser toute la progression ?")) setChecked({});
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 -top-30 h-105 w-205 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-30 h-105 w-130 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800/70 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center">
              <div className="h-4 w-4 rounded-sm bg-emerald-500" />
            </div>
            <div>
              <div className="text-sm text-zinc-400">Roadmap 2026</div>
              <div className="text-lg font-semibold leading-tight">
                Technicien réseau/sys → Cloud junior → DevOps
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Pill>
              {done}/{total} items
            </Pill>
            <div className="w-48">
              <ProgressBar value={overall} />
              <div className="mt-1 text-right text-xs text-zinc-400">
                {overall}%
              </div>
            </div>
            <button
              onClick={reset}
              className="rounded-xl border border-zinc-700/70 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Objectif : job ≤ 3 mois → cloud peu après → devops à terme
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Une roadmap claire, progressive et{" "}
              <span className="text-emerald-400">remote-friendly</span>.
            </h1>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              Suis ta progression semaine après semaine : fondamentaux
              réseau/systèmes pour l’employabilité, puis pivot Cloud (Azure +
              AWS), puis transition DevOps (IaC, CI/CD, K8s, observabilité).
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="text-xs text-zinc-400">Tempo</div>
                <div className="mt-1 font-semibold">30h / semaine</div>
                <div className="mt-2 text-xs text-zinc-500">
                  Ton PC (16 Go) = OK pour 2–3 VMs + Docker.
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="text-xs text-zinc-400">Court terme</div>
                <div className="mt-1 font-semibold">Sys/Réseau</div>
                <div className="mt-2 text-xs text-zinc-500">
                  Support N2, technicien sys/réseau, exploitation.
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="text-xs text-zinc-400">Long terme</div>
                <div className="mt-1 font-semibold">Cloud → DevOps</div>
                <div className="mt-2 text-xs text-zinc-500">
                  IaC, CI/CD, K8s, observabilité, runbooks.
                </div>
              </div>
            </div>
          </div>

          {/* Progress card (mobile-friendly too) */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-400">Progression globale</div>
                <div className="mt-1 text-2xl font-bold text-emerald-400">
                  {overall}%
                </div>
              </div>
              <button
                onClick={reset}
                className="rounded-xl border border-zinc-700/70 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900 transition"
              >
                Reset
              </button>
            </div>
            <div className="mt-4">
              <ProgressBar value={overall} />
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                <span>{done} terminés</span>
                <span>{total - done} restants</span>
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-800 pt-4">
              <div className="text-sm font-semibold">Conseil UX</div>
              <p className="mt-2 text-sm text-zinc-300">
                Coche uniquement quand c’est vraiment fait. Tes README + schémas
                + runbooks = ton “CV technique” (surtout pour le remote).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Phases</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Chaque phase est un menu déroulant avec objectifs, exercices et
              livrables.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Pill>Palette: noir / gris / vert</Pill>
            <Pill>Mode: checklist</Pill>
          </div>
        </div>

        <div className="space-y-4">
          {PHASES.map((phase) => {
            const prog = phaseProgress(phase);
            return (
              <details
                key={phase.id}
                className={cn(
                  "group rounded-3xl border border-zinc-800 bg-zinc-950/50 p-5",
                  "open:border-emerald-500/25 open:bg-zinc-950/70",
                )}
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                        <span className="text-xs font-semibold text-emerald-200">
                          {phase.badge}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            {phase.title}
                          </h3>
                          <span className="rounded-full border border-zinc-700 bg-zinc-900/60 px-2 py-0.5 text-xs text-zinc-300">
                            {phase.timeframe}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          {phase.goal}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-64">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>
                          {prog.d}/{prog.t} items
                        </span>
                        <span className="text-emerald-300">{prog.pct}%</span>
                      </div>
                      <div className="mt-2">
                        <ProgressBar value={prog.pct} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/80" />
                    <span className="group-open:text-zinc-300">
                      Ouvre pour voir “À maîtriser”, “Exercices” et “Livrables”.
                    </span>
                  </div>
                </summary>

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {/* To master */}
                  <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                    <div className="text-sm font-semibold text-zinc-200">
                      À maîtriser
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                      {phase.toMaster.map((m, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500/80" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exercises */}
                  <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                    <div className="text-sm font-semibold text-zinc-200">
                      Exercices
                    </div>
                    <div className="mt-3 space-y-3">
                      {phase.exercises.map((it) => (
                        <label
                          key={it.id}
                          className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 hover:border-emerald-500/25 transition"
                        >
                          <input
                            type="checkbox"
                            checked={!!checked[it.id]}
                            onChange={() => toggle(it.id)}
                            className="mt-1 h-4 w-4 accent-emerald-500"
                          />
                          <div>
                            <div
                              className={cn(
                                "text-sm",
                                checked[it.id]
                                  ? "text-zinc-400 line-through"
                                  : "text-zinc-200",
                              )}
                            >
                              {it.label}
                            </div>
                            {it.hint && (
                              <div className="mt-1 text-xs text-zinc-500">
                                {it.hint}
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                    <div className="text-sm font-semibold text-zinc-200">
                      Livrables (preuves)
                    </div>
                    <div className="mt-3 space-y-3">
                      {phase.deliverables.map((it) => (
                        <label
                          key={it.id}
                          className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 hover:border-emerald-500/25 transition"
                        >
                          <input
                            type="checkbox"
                            checked={!!checked[it.id]}
                            onChange={() => toggle(it.id)}
                            className="mt-1 h-4 w-4 accent-emerald-500"
                          />
                          <div>
                            <div
                              className={cn(
                                "text-sm",
                                checked[it.id]
                                  ? "text-zinc-400 line-through"
                                  : "text-zinc-200",
                              )}
                            >
                              {it.label}
                            </div>
                            {it.hint && (
                              <div className="mt-1 text-xs text-zinc-500">
                                {it.hint}
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3 text-xs text-emerald-200">
                      <span className="font-semibold">Résultat :</span>{" "}
                      {phase.outcome}
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold">
                Objectif 3 mois → puis Cloud
              </div>
              <div className="mt-1 text-sm text-zinc-400">
                Priorité jusqu’à S8 : être embauchable sys/réseau. Ensuite :
                Cloud junior (Azure-first), puis DevOps.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill>IaC tôt</Pill>
              <Pill>Runbooks</Pill>
              <Pill>Proof-driven</Pill>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
